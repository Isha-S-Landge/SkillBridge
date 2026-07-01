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

    return (
        <MyContext.Provider value={providerValues}>
            <BrowserRouter>
                {!user || !token ? (
                    <Login onLogin={handleLogin} />
                ) : (
                    <>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/post-skill" element={<PostSkill />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </>
                )}
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default App;