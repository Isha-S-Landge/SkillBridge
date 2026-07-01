import "./PostSkill.css";
import { useContext, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { useNavigate } from "react-router-dom";

function PostSkill() {
    const { token } = useContext(MyContext);
    const navigate = useNavigate();

    const [skillOffered, setSkillOffered] = useState("");
    const [category, setCategory] = useState("Coding");
    const [skillWanted, setSkillWanted] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!skillOffered || !skillWanted) {
            setError("Please fill all required fields");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    skillOffered,
                    category,
                    skillWanted,
                    description,
                }),
            });

            const res = await response.json();

            if (res.error) {
                setError(res.error);
            } else {
                navigate("/explore");
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="postSkillPage">
            <section className="postSkillHero">
                <div>
                    <span className="pageBadge">Share Knowledge</span>
                    <h1>Post a Skill</h1>
                    <p>
                        Tell the SkillBridge community what you can teach and what
                        you want to learn in return.
                    </p>
                </div>

                <div className="postSkillStats">
                    <div>
                        <strong>120+</strong>
                        <span>Skills shared</span>
                    </div>
                    <div>
                        <strong>350+</strong>
                        <span>Connections made</span>
                    </div>
                </div>
            </section>

            <section className="postSkillContent">
                <form className="postSkillBox" onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <h2>Share Your Skill</h2>
                        <p>
                            Add clear details so the right learner can find and connect
                            with you.
                        </p>
                    </div>

                    <div className="formGrid">
                        <div className="formRow">
                            <label htmlFor="skillOffered">Skill you can teach</label>
                            <input
                                id="skillOffered"
                                type="text"
                                placeholder="e.g. React.js, Guitar, Cooking..."
                                value={skillOffered}
                                onChange={(e) => setSkillOffered(e.target.value)}
                            />
                        </div>

                        <div className="formRow">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Coding">Coding</option>
                                <option value="Design">Design</option>
                                <option value="Music">Music</option>
                                <option value="Language">Language</option>
                                <option value="Business">Business</option>
                                <option value="Career">Career</option>
                                <option value="Creative">Creative</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="formRow">
                        <label htmlFor="skillWanted">Skill you want in return</label>
                        <input
                            id="skillWanted"
                            type="text"
                            placeholder="e.g. Figma, Python, English..."
                            value={skillWanted}
                            onChange={(e) => setSkillWanted(e.target.value)}
                        />
                    </div>

                    <div className="formRow">
                        <label htmlFor="description">About you</label>
                        <textarea
                            id="description"
                            placeholder="Tell others about your experience, availability, and learning goal..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {error && <p className="formError">{error}</p>}

                    <button className="submitBtn" type="submit" disabled={loading}>
                        {loading ? "Posting..." : "Post Skill"}
                    </button>
                </form>

                <aside className="postingTips">
                    <h3>Tips for a good post</h3>

                    <div className="tipItem">
                        <span>1</span>
                        <p>Write the exact skill you can teach.</p>
                    </div>

                    <div className="tipItem">
                        <span>2</span>
                        <p>Mention your current level and experience.</p>
                    </div>

                    <div className="tipItem">
                        <span>3</span>
                        <p>Be clear about what you want to learn in return.</p>
                    </div>

                    <div className="tipItem">
                        <span>4</span>
                        <p>Add availability or preferred learning style.</p>
                    </div>
                </aside>
            </section>
        </div>
    );
}

export default PostSkill;