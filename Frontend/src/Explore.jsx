import "./Explore.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";

const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
    } catch {
        return null;
    }
};

function Explore() {
    const { token } = useContext(MyContext);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectStatus, setConnectStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const currentUserId = getUserIdFromToken(token);

    const fetchSkills = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`);
            const res = await response.json();
            setSkills(res);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const fetchSentRequests = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/connections/sent`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();

            if (Array.isArray(res)) {
                const statusMap = {};
                res.forEach((conn) => {
                    statusMap[conn.skillId] = "Request sent!";
                });
                setConnectStatus(statusMap);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const sendConnectRequest = async (skillId, receiverId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/connections`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ skillId, receiverId }),
            });

            const res = await response.json();

            if (res.error) {
                setConnectStatus((prev) => ({
                    ...prev,
                    [skillId]: "Error: " + res.error,
                }));
            } else {
                setConnectStatus((prev) => ({
                    ...prev,
                    [skillId]: "Request sent!",
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSkills();
        fetchSentRequests();
    }, []);

    const categories = ["All", ...new Set(skills.map((skill) => skill.category).filter(Boolean))];

    const filteredSkills = skills.filter((skill) => {
        const searchText = `${skill.skillOffered} ${skill.skillWanted} ${skill.description} ${skill.userId?.name} ${skill.userId?.city}`.toLowerCase();

        const matchesSearch = searchText.includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || skill.category === selectedCategory;
        const isNotOwnSkill = skill.userId?._id !== currentUserId;

        return matchesSearch && matchesCategory && isNotOwnSkill;
    });

    return (
        <div className="explorePage">
            <section className="exploreHero">
                <span className="pageBadge">Explore Skills</span>
                <h1>Find the Right Skill Partner</h1>
                <p>
                    Browse students who are ready to teach, discover what they want to
                    learn, and start a meaningful skill exchange.
                </p>
            </section>

            <section className="exploreToolbar">
                <div className="searchBox">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search skills, mentors, or cities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option value={category} key={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </section>

            {loading && <p className="loadingText">Loading skills...</p>}

            {!loading && filteredSkills.length === 0 && (
                <div className="emptyState">
                    <h2>No skills found</h2>
                    <p>Try another search term or category.</p>
                </div>
            )}

            <section className="skillsGrid">
                {filteredSkills.map((skill) => (
                    <article className="skillCard" key={skill._id}>
                        <div className="skillCardTop">
                            <div className="skillAvatar">
                                {skill.userId?.name?.charAt(0)?.toUpperCase() || "S"}
                            </div>

                            <div>
                                <h3>{skill.skillOffered}</h3>
                                <p className="postedBy">
                                    By {skill.userId?.name || "SkillBridge User"}
                                    {skill.userId?.city ? ` • ${skill.userId.city}` : ""}
                                </p>
                            </div>
                        </div>

                        <span className="categoryTag">{skill.category}</span>

                        <div className="exchangeBox">
                            <p className="exchangeLabel">Wants to learn</p>
                            <p className="wantedSkill">{skill.skillWanted}</p>
                        </div>

                        <p className="description">
                            {skill.description || "No description added yet."}
                        </p>

                        {connectStatus[skill._id] ? (
                            <p
                                className={
                                    connectStatus[skill._id].startsWith("Error")
                                        ? "connectStatusText error"
                                        : "connectStatusText"
                                }
                            >
                                {connectStatus[skill._id]}
                            </p>
                        ) : (
                            <button
                                className="connectBtn"
                                onClick={() =>
                                    sendConnectRequest(skill._id, skill.userId?._id)
                                }
                            >
                                Connect
                            </button>
                        )}
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Explore;