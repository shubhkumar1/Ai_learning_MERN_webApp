// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Signup from './SignUp.jsx'
// import LogIn from './LogIn.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App /> */}
//     {/* <Signup /> */}
//     <LogIn />
//   </StrictMode>,
// )



import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // If you have global styles
import PageRouter from './PageRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageRouter />
  </React.StrictMode>,
)