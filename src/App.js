import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Packing from "./scenes/packing";
import Picking from "./scenes/picking";
import SignInSide from "./components/SignIn";
import './App.css'
import CookieVerification from "./scenes/global/CookieVerification";
import SetWorker from "./scenes/global/SetWorker";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Problem from "./scenes/problem";
import Admin from "./scenes/admin";
import Settings from "./scenes/settings/Settings";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (

        <ColorModeContext.Provider value={colorMode}>
          <SetWorker />
          <CookieVerification />
          <ToastContainer/>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/packing" element={<Packing />} />
                  <Route path="/picking" element={<Picking />} />
                  <Route path="/login" element={<SignInSide />} />
                  <Route path="/problem" element={<Problem />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />

                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>

  );
}

export default App;
