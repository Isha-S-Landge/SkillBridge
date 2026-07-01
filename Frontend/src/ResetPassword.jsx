import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Login.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password }),
                }
            );

            const res = await response.json();

            if (res.error) {
                setError(res.error);
            } else {
                setSuccess("Password reset! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
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
                        <h2>Set a new password</h2>
                    </div>

                    <div className="fieldGroup">
                        <label htmlFor="password">New password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="loginInput"
                        />
                    </div>

                    <div className="fieldGroup">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="loginInput"
                        />
                    </div>

                    {error && <p className="loginError">{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}

                    <button className="loginBtn" type="submit" disabled={loading}>
                        {loading ? "Please wait..." : "Reset Password"}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default ResetPassword;