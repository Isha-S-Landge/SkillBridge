import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Explore from "./Explore.jsx";
import PostSkill from "./PostSkill.jsx";
import Profile from "./Profile.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";
import Connections from "./Connections.jsx";

function App() {
    const [user, setUser] = useState(() => {
        return localStorage.getItem("name") || null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const handleLogin = (name) => {
        setUser(name);
        setToken(localStorage.getItem("token"));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setUser(null);
        setToken(null);
    };

    const providerValues = {
        user,
        token,
        handleLogout,
    };

    const isLoggedIn = user && token;

    return (
        <MyContext.Provider value={providerValues}>
            <BrowserRouter>
                {isLoggedIn && <Navbar />}
                <Routes>
                    <Route
                        path="/"
                        element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}
                    />
                    <Route
                        path="/explore"
                        element={isLoggedIn ? <Explore /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/post-skill"
                        element={isLoggedIn ? <PostSkill /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/profile"
                        element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/connections"
                        element={isLoggedIn ? <Connections /> : <Navigate to="/" replace />}
                    />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default App;