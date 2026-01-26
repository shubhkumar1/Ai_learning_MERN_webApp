// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const ChatHistory = require('../models/ChatHistory');
// const User = require('../models/User');
// const { constructSystemPrompt } = require('../utils/promptFactory');

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// // Basic Bad Word Filter (Safety Layer 1)
// const BANNED_TOPICS = ['violence', 'kill', 'drug', 'sex']; // Expand this list in production

// exports.handleChat = async (req, res) => {
//   try {
//     const { userId, message, currentSubject } = req.body;

//     // 1. Safety Filter (Pre-check)
//     if (BANNED_TOPICS.some(word => message.toLowerCase().includes(word))) {
//       return res.json({ response: "I cannot discuss that topic. Let's get back to studying! 📚" });
//     }

//     // 2. Fetch User Context
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // 3. Fetch History for "Memory" (Last 5 turns)
//     let chatHistory = await ChatHistory.findOne({ userId });
//     if (!chatHistory) {
//       chatHistory = new ChatHistory({ userId, messages: [] });
//     }

//     // Construct history context string for Gemini (Gemini Pro handles context via chat sessions, but we simulate it for manual control)
//     const recentHistory = chatHistory.messages.slice(-6).map(m => `${m.role === 'user' ? 'Student' : 'AI'}: ${m.content}`).join('\n');

//     // 4. Generate System Prompt
//     const systemInstruction = constructSystemPrompt({
//       classLevel: user.classLevel,
//       persona: user.personaPreference,
//       name: user.name
//     });

//     const finalPrompt = `
//       ${systemInstruction}

//       CONTEXT (Previous conversation):
//       ${recentHistory}

//       CURRENT SUBJECT: ${currentSubject}
//       NEW QUESTION: ${message}
//     `;

//     // 5. Call AI
//     const result = await model.generateContent(finalPrompt);
//     const response = await result.response;
//     const aiText = response.text();

//     // 6. Save to DB
//     chatHistory.messages.push({ role: 'user', content: message });
//     chatHistory.messages.push({ role: 'model', content: aiText });
//     await chatHistory.save();

//     res.json({ response: aiText });

//   } catch (error) {
//     console.error("AI Error:", error);
//     res.status(500).json({ error: "My brain is tired. Try again!" });
//   }
// };



const OpenAI = require("openai");
const ChatHistory = require('../models/ChatHistory');
const User = require('../models/User');
const { constructSystemPrompt } = require('../utils/promptFactory');

// Initialize OpenAI client pointing to OpenRouter
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY, // Make sure to update your .env file
});

// Basic Bad Word Filter
const BANNED_TOPICS = ['violence', 'kill', 'drug', 'sex'];

exports.handleChat = async (req, res) => {
  try {
    const { userId, message, currentSubject } = req.body;

    // 1. Safety Filter
    if (BANNED_TOPICS.some(word => message.toLowerCase().includes(word))) {
      return res.json({ response: "I cannot discuss that topic. Let's get back to studying! 📚" });
    }

    // 2. Fetch User Context
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 3. Fetch History
    let chatHistory = await ChatHistory.findOne({ userId });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ userId, messages: [] });
    }

    // 4. Generate System Prompt
    const systemInstruction = constructSystemPrompt({
      classLevel: user.classLevel,
      persona: user.personaPreference,
      name: user.name
    });

    // 5. Construct Message Array
    const messages = [
      { role: "system", content: systemInstruction }
    ];

    // Append Recent History
    // We explicitly map 'reasoning_details' if it exists in the DB
    const historyMessages = chatHistory.messages.slice(-6).map(m => {
      const msgObj = {
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.content
      };

      // If the saved message has reasoning details, pass them back to the API
      // to maintain the "chain of thought" context
      //------------------------------------------------------------
      // if (m.reasoning_details) {
      //   msgObj.reasoning_details = m.reasoning_details;
      // }
      //-------------------------------------------------------------

      return msgObj;
    });

    messages.push(...historyMessages);

    // Append Current User Message
    messages.push({
      role: "user",
      content: `[Current Subject: ${currentSubject}] ${message}`
    });

    // 6. Call AI with Reasoning Enabled
    const completion = await client.chat.completions.create({
      model: 'xiaomi/mimo-v2-flash:free',
      messages: messages,
      // Enabling reasoning as per your snippet
      // reasoning: { enabled: true } 

    });

    // Extract message and specific reasoning details
    const responseMessage = completion.choices[0].message;
    const aiText = responseMessage.content;
    // const reasoningDetails = responseMessage.reasoning_details || null;

    // 7. Save to DB
    chatHistory.messages.push({ role: 'user', content: message });

    // Save AI response along with the reasoning_details for future context
    chatHistory.messages.push({
      role: 'model',
      content: aiText,
      // reasoning_details: reasoningDetails 
    });

    await chatHistory.save();
    console.log(aiText)
    res.json({ response: aiText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "My brain is tired. Try again!" });
  }
};