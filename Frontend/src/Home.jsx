import "./Home.css";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import { Link } from "react-router-dom";
import heroImage from "./assets/hero-illustration.png";

function Home() {
    const { user } = useContext(MyContext);

    const features = [
        {
            title: "Peer-to-Peer Learning",
            text: "Learn directly from students who have practical knowledge and real-world experience.",
        },
        {
            title: "Skill-Based Matching",
            text: "We match you with the right people based on your goals, skills, and interests.",
        },
        {
            title: "Learn at Your Own Pace",
            text: "No pressure, no deadlines. Learn and teach at a pace that works for you.",
        },
        {
            title: "Build Your Network",
            text: "Connect with like-minded students and expand your academic and professional network.",
        },
    ];

    const steps = [
        {
            title: "Create Your Profile",
            text: "Tell others what you can teach and what you want to learn.",
        },
        {
            title: "Find the Right Match",
            text: "Browse students based on skills, interests, and experience.",
        },
        {
            title: "Connect",
            text: "Send a learning request and start your skill-sharing journey.",
        },
        {
            title: "Learn & Teach",
            text: "Grow together by exchanging knowledge and gaining practical experience.",
        },
    ];

    const skills = [
        ["Programming", "Python", "JavaScript", "C++", "Java", "React"],
        ["Design", "Figma", "UI/UX Design", "Photoshop", "Canva", "Illustrator"],
        ["Business", "Marketing", "Finance", "Entrepreneurship", "Excel", "Business Analysis"],
        ["Career", "Resume Building", "Interview Prep", "Aptitude", "Communication", "LinkedIn Profile"],
        ["Creative", "Guitar", "Photography", "Video Editing", "Content Writing", "Public Speaking"],
    ];

    const mentors = [
        ["Aarav Sharma", "React Developer", "React, JavaScript", "4.9 (32)", "Available"],
        ["Priya Verma", "UI/UX Designer", "Figma, UI/UX Design", "4.8 (18)", "Available"],
        ["Rahul Patel", "Competitive Programmer", "DSA, C++, Python", "5.0 (45)", "Busy"],
        ["Sneha Iyer", "Content Writer", "Content Writing", "4.9 (27)", "Available"],
        ["Aditya Singh", "Data Analyst", "Excel, Data Analysis", "4.7 (21)", "Available"],
    ];

    return (
        <div className="homePage">
            <section className="heroSection">
                <div className="heroLeft">
                    <h1>
                        Learn. Teach.
                        <br />
                        <span className="heroAccent">Grow Together.</span>
                    </h1>

                    <p>
                        SkillBridge connects students who want to learn with students who are ready
                        to teach. Exchange knowledge, build practical skills, and grow your network
                        - all in one place.
                    </p>

                    <div className="heroButtons">
                        <Link to="/explore" className="primaryBtn">
                            Explore Skills
                        </Link>
                        <Link to="/post-skill" className="secondaryBtn">
                            Become a Mentor
                        </Link>
                    </div>

                    <div className="studentProof">
                        <div className="avatarStack">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>
                            <strong>500+</strong> students already learning
                            <br />
                            and teaching together
                        </p>
                    </div>
                </div>

                <div className="heroRight">
                    <div className="illustrationCard">
                        <img
                            src={heroImage}
                            alt="Students collaborating"
                            className="heroImage"
                        />

                        <div className="bubble bubbleTeach">
                            <span>📘</span>
                            <div>
                                <strong>Teach</strong>
                                <p>What you know</p>
                            </div>
                        </div>

                        <div className="bubble bubbleLearn">
                            <span>✅</span>
                            <div>
                                <strong>Learn</strong>
                                <p>What you love</p>
                            </div>
                        </div>

                        <div className="bubble bubbleConnect">
                            <span>🤝</span>
                            <div>
                                <strong>Grow</strong>
                                <p>Together</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contentCard" id="about-us">
                <h2 className="sectionTitle">Why Choose SkillBridge?</h2>
                <div className="sectionUnderline"></div>

                <div className="featuresGrid">
                    {features.map((feature, index) => (
                        <div className="featureCard" key={feature.title}>
                            <div className="featureIcon">{index + 1}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </div>
                    ))}
                </div>

                <div className="statsBar">
                    <div className="statBox">
                        <p className="statNumber">500+</p>
                        <p className="statLabel">Students</p>
                    </div>
                    <div className="statBox">
                        <p className="statNumber">120+</p>
                        <p className="statLabel">Skills</p>
                    </div>
                    <div className="statBox">
                        <p className="statNumber">350+</p>
                        <p className="statLabel">Successful Connections</p>
                    </div>
                    <div className="statBox">
                        <p className="statNumber">40+</p>
                        <p className="statLabel">Colleges</p>
                    </div>
                </div>
            </section>

            <section className="contentCard">
                <h2 className="leftTitle">What Our Students Say</h2>

                <div className="testimonialsGrid">
                    <div className="testimonialCard">
                        <p>
                            I wanted to learn React but couldn't afford a course. Through
                            SkillBridge, I exchanged my design skills and learned React from
                            another student.
                        </p>
                        <strong>- Neha K.</strong>
                    </div>

                    <div className="testimonialCard">
                        <p>
                            Teaching Java on SkillBridge improved my confidence while helping
                            me learn UI/UX in return. It's a win-win for everyone.
                        </p>
                        <strong>- Rohit M.</strong>
                    </div>

                    <div className="testimonialCard">
                        <p>
                            The platform is simple, effective, and truly student-friendly.
                            I've connected with great people and learned so much.
                        </p>
                        <strong>- Anjali P.</strong>
                    </div>
                </div>
            </section>

            <section className="howSection" id="how-it-works">
                <h2 className="sectionTitle">How It Works</h2>
                <div className="sectionUnderline"></div>

                <div className="howItWorks">
                    {steps.map((step, index) => (
                        <div className="stepCard" key={step.title}>
                            <div className="stepNumber">{index + 1}</div>
                            <div className="stepImage"></div>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="skillsSection">
                <div className="sectionHeader">
                    <h2>Top Skills on SkillBridge</h2>
                    <Link to="/explore">View all skills →</Link>
                </div>

                <div className="skillsGrid">
                    {skills.map((skill, index) => (
                        <div className={`skillCard skillCard${index}`} key={skill[0]}>
                            <div className="skillIcon">{skill[0][0]}</div>
                            <h3>{skill[0]}</h3>

                            {skill.slice(1).map((item) => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mentorsSection">
                <div className="sectionHeader">
                    <h2>Featured Mentors</h2>
                    <Link to="/post-skill">Become a mentor →</Link>
                </div>

                <div className="mentorsGrid">
                    {mentors.map((mentor, index) => (
                        <div className="mentorCard" key={mentor[0]}>
                            <div className={`mentorPhoto mentorPhoto${index}`}></div>

                            <h3>{mentor[0]}</h3>
                            <p>{mentor[1]}</p>
                            <p className="rating">⭐ {mentor[3]}</p>

                            <small>
                                Teaches
                                <br />
                                {mentor[2]}
                            </small>

                            <span
                                className={
                                    mentor[4] === "Busy" ? "busyTag" : "availableTag"
                                }
                            >
                                {mentor[4]}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ctaSection">
                <div>
                    <h2>Ready to Share Your Skills?</h2>
                    <p>
                        Join SkillBridge today and become part of a community where students
                        learn from each other.
                    </p>
                    <Link to={user ? "/post-skill" : "/login"}>
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;