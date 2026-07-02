import "./Connections.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";

function Connections() {
    const { token } = useContext(MyContext);
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        try {
            const [receivedRes, sentRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/api/connections/received`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${import.meta.env.VITE_API_URL}/api/connections/sent`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const receivedData = await receivedRes.json();
            const sentData = await sentRes.json();

            setReceived(Array.isArray(receivedData) ? receivedData : []);
            setSent(Array.isArray(sentData) ? sentData : []);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const respondToRequest = async (connectionId, status) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/connections/${connectionId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            fetchConnections();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="connectionsPage">
            <section className="connectionsHero">
                <span className="pageBadge">Connections</span>
                <h1>Your Skill Exchange Requests</h1>
                <p>Manage incoming requests and track the ones you've sent.</p>
            </section>

            {loading && <p className="loadingText">Loading connections...</p>}

            {!loading && (
                <>
                    <section className="connectionsSection">
                        <h2>Requests You've Received</h2>

                        {received.length === 0 && (
                            <p className="emptyText">No one has requested to connect with you yet.</p>
                        )}

                        <div className="connectionsGrid">
                            {received.map((conn) => (
                                <div className="connectionCard" key={conn._id}>
                                    <p className="connectionSkill">
                                        {conn.skillId?.skillOffered || "A skill"}
                                    </p>
                                    <p className="connectionPerson">
                                        From: <strong>{conn.requesterId?.name}</strong>
                                        {conn.requesterId?.city ? ` • ${conn.requesterId.city}` : ""}
                                    </p>

                                    <span className={`statusTag status-${conn.status}`}>
                                        {conn.status}
                                    </span>

                                    {conn.status === "pending" && (
                                        <div className="connectionActions">
                                            <button
                                                className="acceptBtn"
                                                onClick={() => respondToRequest(conn._id, "accepted")}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="rejectBtn"
                                                onClick={() => respondToRequest(conn._id, "rejected")}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    {conn.status === "accepted" && (
                                        <p className="contactInfo">
                                            📧 Contact: <a href={`mailto:${conn.requesterId?.email}`}>
                                                {conn.requesterId?.email}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="connectionsSection">
                        <h2>Requests You've Sent</h2>

                        {sent.length === 0 && (
                            <p className="emptyText">You haven't sent any requests yet.</p>
                        )}

                        <div className="connectionsGrid">
                            {sent.map((conn) => (
                                <div className="connectionCard" key={conn._id}>
                                    <p className="connectionSkill">
                                        {conn.skillId?.skillOffered || "A skill"}
                                    </p>
                                    <p className="connectionPerson">
                                        To: <strong>{conn.receiverId?.name}</strong>
                                        {conn.receiverId?.city ? ` • ${conn.receiverId.city}` : ""}
                                    </p>

                                    <span className={`statusTag status-${conn.status}`}>
                                        {conn.status}
                                    </span>

                                    {conn.status === "accepted" && (
                                        <p className="contactInfo">
                                            📧 Contact: <a href={`mailto:${conn.receiverId?.email}`}>
                                                {conn.receiverId?.email}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default Connections;