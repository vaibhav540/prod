
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "./styles/global.less";
import { Provider } from "react-redux";
import { store } from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
let clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>

)
