import './style.css';
import { createRoot } from 'react-dom/client'
import App from "./app.js"


import React from 'react'
import { StrictMode } from "react";


const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
