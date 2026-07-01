import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const url = isSignup
        ? `${import.meta.env.VITE_API_URL}/api/auth/signup`
        : `${import.meta.env.VITE_API_URL}/api/auth/login`;

        const body = isSignup
            ? { name, email, password, city }
            : { email, password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const res = await response.json();

            if (res.error) {
                setError(res.error);
            } else {
                localStorage.setItem("token", res.token);
                localStorage.setItem("name", res.name);
                onLogin(res.name);
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    const toggleMode = () => {
        setIsSignup((prev) => !prev);
        setError("");
    };

    return (
        <div className="loginPage">
            <section className="loginHero">
                <div className="loginBrand">
                    <span className="logoIcon">◆</span>
                    <span>SkillBridge</span>
                </div>

                <h1>
                    Learn. Teach.
                    <span>Grow Together.</span>
                </h1>

                <p>
                    Join a student-powered community where learners and mentors
                    exchange skills, build confidence, and grow their network.
                </p>

                <div className="loginHighlights">
                    <div>
                        <strong>500+</strong>
                        <span>Students</span>
                    </div>
                    <div>
                        <strong>120+</strong>
                        <span>Skills</span>
                    </div>
                    <div>
                        <strong>350+</strong>
                        <span>Connections</span>
                    </div>
                </div>
            </section>

            <section className="loginPanel">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <span className="pageBadge">
                            {isSignup ? "Create Account" : "Welcome Back"}
                        </span>

                        <h2>{isSignup ? "Start learning today" : "Log in to SkillBridge"}</h2>

                        <p>
                            {isSignup
                                ? "Create your profile and start exchanging skills with other students."
                                : "Continue your skill-sharing journey with your community."}
                        </p>
                    </div>

                    {isSignup && (
                        <div className="inputGrid">
                            <div className="fieldGroup">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="loginInput"
                                />
                            </div>

                            <div className="fieldGroup">
                                <label htmlFor="city">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    placeholder="Your city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="loginInput"
                                />
                            </div>
                        </div>
                    )}

                    <div className="fieldGroup">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="loginInput"
                        />
                    </div>

                    <div className="fieldGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="loginInput"
                        />
                    </div>

                    {error && <p className="loginError">{error}</p>}

                    <button className="loginBtn" type="submit" disabled={loading}>
                        {loading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
                    </button>

                    <p className="loginSwitch">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                        <button type="button" onClick={toggleMode}>
                            {isSignup ? "Log In" : "Sign Up"}
                        </button>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Login;