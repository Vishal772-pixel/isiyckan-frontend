import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Ensure the root element exists before rendering
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Error: 'root' element not found in index.html");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
