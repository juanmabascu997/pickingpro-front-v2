import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Packing from "./scenes/packing";
import Picking from "./scenes/picking";
import SignInSide from "./components/SignIn";
import { setLogin } from "./redux/actions/actions";
import { useDispatch } from "react-redux";
import './App.css'
import CookieVerification from "./scenes/global/CookieVerification";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(()=>{
    if(location) {
      if(location.pathname === '/login'){
        setLogin(true).then((res) => {
          dispatch(res);
        })
      } else {
        setLogin(false).then((res) => {
          dispatch(res);
        })
      }
    }
  },[location])

  return (

        <ColorModeContext.Provider value={colorMode}>
          <CookieVerification />
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
                  {/* <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} /> */}
                  <Route path="/login" element={<SignInSide />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>

  );
}

export default App;
