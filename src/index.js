import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hello from './js/hello'
import reportWebVitals from './reportWebVitals';
window.addEventListener("DOMContentLoaded", function (e) {
	ReactDOM.createRoot(document.getElementById('root'))
	.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
});


