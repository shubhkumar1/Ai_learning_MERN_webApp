const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatHistory = require('../models/ChatHistory');
const User = require('../models/User');
const { constructSystemPrompt } = require('../utils/promptFactory');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Basic Bad Word Filter (Safety Layer 1)
const BANNED_TOPICS = ['violence', 'kill', 'drug', 'sex']; // Expand this list in production

exports.handleChat = async (req, res) => {
  try {
    const { userId, message, currentSubject } = req.body;

    // 1. Safety Filter (Pre-check)
    if (BANNED_TOPICS.some(word => message.toLowerCase().includes(word))) {
      return res.json({ response: "I cannot discuss that topic. Let's get back to studying! 📚" });
    }

    // 2. Fetch User Context
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 3. Fetch History for "Memory" (Last 5 turns)
    let chatHistory = await ChatHistory.findOne({ userId });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ userId, messages: [] });
    }

    // Construct history context string for Gemini (Gemini Pro handles context via chat sessions, but we simulate it for manual control)
    const recentHistory = chatHistory.messages.slice(-6).map(m => `${m.role === 'user' ? 'Student' : 'AI'}: ${m.content}`).join('\n');

    // 4. Generate System Prompt
    const systemInstruction = constructSystemPrompt({
      classLevel: user.classLevel,
      persona: user.personaPreference,
      name: user.name
    });

    const finalPrompt = `
      ${systemInstruction}
      
      CONTEXT (Previous conversation):
      ${recentHistory}
      
      CURRENT SUBJECT: ${currentSubject}
      NEW QUESTION: ${message}
    `;

    // 5. Call AI
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const aiText = response.text();

    // 6. Save to DB
    chatHistory.messages.push({ role: 'user', content: message });
    chatHistory.messages.push({ role: 'model', content: aiText });
    await chatHistory.save();

    res.json({ response: aiText });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "My brain is tired. Try again!" });
  }
};