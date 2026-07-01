import { useState } from "react";
import "./Login.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [resetLink, setResetLink] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResetLink("");
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const res = await response.json();

            if (res.error) {
                setError(res.error);
            } else {
                setResetLink(res.resetLink);
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="loginPage">
            <section className="loginPanel" style={{ margin: "0 auto" }}>
                <form className="loginBox" onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <span className="pageBadge">Reset Password</span>
                        <h2>Forgot your password?</h2>
                        <p>Enter your email and we'll generate a reset link.</p>
                    </div>

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

                    {error && <p className="loginError">{error}</p>}

                    {resetLink && (
                        <div style={{ wordBreak: "break-all", fontSize: "0.85rem", marginBottom: "12px" }}>
                            <p>Demo mode — here's your reset link:</p>
                            <a href={resetLink}>{resetLink}</a>
                        </div>
                    )}

                    <button className="loginBtn" type="submit" disabled={loading}>
                        {loading ? "Please wait..." : "Generate Reset Link"}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default ForgotPassword;