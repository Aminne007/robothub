import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ThemeProvider } from "./context/ThemeContext";
import {AuthProvider} from "./context/AuthContext";
import "./context/I18n";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
  </ThemeProvider>
);
