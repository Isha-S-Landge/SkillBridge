import "./Profile.css";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./MyContext.jsx";

function Profile() {
    const { user, token } = useContext(MyContext);
    const [mySkills, setMySkills] = useState([]);
    const [ratingData] = useState({ ratings: [], avgRating: 0 });
    const [loading, setLoading] = useState(true);

    const fetchMySkills = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/my-skills`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const res = await response.json();
            setMySkills(res);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const deleteSkill = async (skillId) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/skills/${skillId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            setMySkills((prev) => prev.filter((skill) => skill._id !== skillId));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMySkills();
    }, []);

    return (
        <div className="profilePage">
            <section className="profileHero">
                <div className="profileIdentity">
                    <div className="profileAvatar">
                        {user?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                        <span className="pageBadge">My Profile</span>
                        <h1>{user || "SkillBridge User"}</h1>
                        <p>
                            Manage your posted skills, review your activity, and keep your
                            skill-sharing profile ready for new learners.
                        </p>
                    </div>
                </div>

                <div className="profileRatingCard">
                    <strong>{ratingData.avgRating.toFixed(1)} ⭐</strong>
                    <span>{ratingData.ratings.length} reviews</span>
                </div>
            </section>

            <section className="profileStats">
                <div>
                    <strong>{mySkills.length}</strong>
                    <span>Posted Skills</span>
                </div>
                <div>
                    <strong>{mySkills.filter((skill) => skill.category === "Coding").length}</strong>
                    <span>Coding Skills</span>
                </div>
                <div>
                    <strong>{ratingData.ratings.length}</strong>
                    <span>Reviews</span>
                </div>
            </section>

            <section className="profileContent">
                <div className="profileSectionHeader">
                    <div>
                        <h2>My Posted Skills</h2>
                        <p>These are the skills currently visible to other learners.</p>
                    </div>

                    <Link to="/post-skill">Post New Skill</Link>
                </div>

                {loading && <p className="loadingText">Loading your skills...</p>}

                {!loading && mySkills.length === 0 && (
                    <div className="emptyProfileState">
                        <h3>You haven't posted any skills yet.</h3>
                        <p>
                            Share what you can teach and start finding students who want
                            to learn from you.
                        </p>
                        <Link to="/post-skill">Post Your First Skill</Link>
                    </div>
                )}

                <div className="mySkillsList">
                    {mySkills.map((skill) => (
                        <article className="mySkillCard" key={skill._id}>
                            <div className="skillMain">
                                <div className="skillIcon">
                                    {skill.skillOffered?.charAt(0)?.toUpperCase() || "S"}
                                </div>

                                <div>
                                    <h3>{skill.skillOffered}</h3>
                                    <span className="categoryTag">{skill.category}</span>
                                </div>
                            </div>

                            <div className="skillExchange">
                                <p>Wants to learn</p>
                                <strong>{skill.skillWanted}</strong>
                            </div>

                            {skill.description && (
                                <p className="skillDescription">{skill.description}</p>
                            )}

                            <button
                                className="deleteBtn"
                                onClick={() => deleteSkill(skill._id)}
                            >
                                Delete
                            </button>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Profile;