import { Container } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    const team = [
        { name: "Eithar AlWadhahi", role: "Co-Founder & CEO", emoji: "👩‍💼" },
        { name: "Asma ALAbri", role: "Lead Developer", emoji: "👨‍💻" },
        { name: "Mia Johnson", role: "Animal Care Specialist", emoji: "👩‍⚕️" },
        { name: "Muaiyid AlZadjali", role: "UX Designer", emoji: "🎨" },
    ];

    const stats = [
        { number: "1,200+", label: "Pets Adopted" },
        { number: "850+", label: "Happy Families" },
        { number: "15+", label: "Partner Shelters" },
        { number: "3", label: "Years of Service" },
    ];

    const values = [
        { emoji: "❤️", title: "Compassion", desc: "Every animal deserves love, care, and a safe place to call home." },
        { emoji: "🤝", title: "Trust", desc: "We build transparent relationships between adopters and shelters." },
        { emoji: "🌍", title: "Community", desc: "We believe in building a kinder world, one adoption at a time." },
        { emoji: "🔒", title: "Safety", desc: "All pets are vetted, vaccinated, and health-checked before listing." },
    ];

    return (
        <div style={{ background: "linear-gradient(to right, #f2f2f2, #ffe5d0)", minHeight: "100vh" }}>

            {/* NAVBAR */}
            <div style={{
                backgroundColor: "#ffffff",
                borderBottom: "2px solid #f4a261",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h4 style={{ color: "#f4a261", margin: 0 }}>PETMATCH</h4>
                <div style={{ display: "flex", gap: "20px" }}>
                    {[
                        { label: "Home", to: "/home" },
                        { label: "List", to: "/list" },
                        { label: "About Us", to: "/about" },
                        { label: "Contact Us", to: "/contact" },
                        { label: "Profile", to: "/profile" },
                    ].map(link => (
                        <NavLink key={link.to} to={link.to} style={{ color: "#f4a261", textDecoration: "none" }}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* HERO */}
            <Container style={{ paddingTop: "50px", paddingBottom: "30px" }}>
                <h1 style={{ fontWeight: "bold", color: "#000" }}>About Us 🐾</h1>
                <p style={{ color: "#555", fontSize: "15px", maxWidth: "650px", lineHeight: "1.8" }}>
                    PetMatch was founded with one simple belief: every animal deserves a loving home. We connect
                    shelters, rescue groups, and individuals with families ready to give a pet a second chance at life.
                </p>
            </Container>

            {/* STATS */}
            <Container style={{ marginBottom: "40px" }}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center"
                }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{
                            backgroundColor: "#fff",
                            borderRadius: "15px",
                            padding: "25px 35px",
                            textAlign: "center",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                            border: "1px solid #ffe5d0",
                            minWidth: "140px"
                        }}>
                            <h2 style={{ color: "#f4a261", fontWeight: "bold", margin: 0 }}>{stat.number}</h2>
                            <p style={{ color: "#555", margin: 0, fontSize: "14px" }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* OUR STORY */}
            <Container style={{ marginBottom: "40px" }}>
                <div style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "35px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    border: "1px solid #f4a261"
                }}>
                    <h3 style={{ color: "#f4a261", marginBottom: "15px" }}>Our Story</h3>
                    <p style={{ color: "#555", lineHeight: "1.9", fontSize: "15px" }}>
                        PetMatch was born in 2023 in Muscat, Oman, out of a passion for animals and frustration with
                        how difficult it was to find pets for adoption locally. Our founders — a developer and an animal
                        shelter volunteer — teamed up to build a simple, trustworthy platform that bridges the gap between
                        loving families and animals in need.
                    </p>
                    <p style={{ color: "#555", lineHeight: "1.9", fontSize: "15px" }}>
                        Today, we proudly serve thousands of users across Oman and continue to expand our network
                        of partner shelters. Every adoption on PetMatch is a story of hope, connection, and new beginnings.
                    </p>
                </div>
            </Container>

            {/* OUR VALUES */}
            <Container style={{ marginBottom: "40px" }}>
                <h3 style={{ color: "#f4a261", marginBottom: "20px" }}>Our Values</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {values.map((val, i) => (
                        <div key={i} style={{
                            flex: "1 1 200px",
                            backgroundColor: "#fff",
                            borderRadius: "15px",
                            padding: "25px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                            border: "1px solid #ffe5d0"
                        }}>
                            <div style={{ fontSize: "35px", marginBottom: "10px" }}>{val.emoji}</div>
                            <h5 style={{ fontWeight: "bold", marginBottom: "8px" }}>{val.title}</h5>
                            <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>{val.desc}</p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* TEAM */}
            <Container style={{ marginBottom: "60px" }}>
                <h3 style={{ color: "#f4a261", marginBottom: "20px" }}>Meet the Team</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {team.map((member, i) => (
                        <div key={i} style={{
                            flex: "1 1 180px",
                            backgroundColor: "#fff",
                            borderRadius: "15px",
                            padding: "25px",
                            textAlign: "center",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                            border: "1px solid #ffe5d0"
                        }}>
                            <div style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                backgroundColor: "#ffe5d0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 15px auto",
                                fontSize: "32px",
                                border: "3px solid #f4a261"
                            }}>
                                {member.emoji}
                            </div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "5px" }}>{member.name}</h6>
                            <p style={{ color: "#f4a261", fontSize: "13px", margin: 0 }}>{member.role}</p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* FOOTER */}
            <div style={{ backgroundColor: "#ffffff", borderTop: "2px solid #f4a261", padding: "40px 20px" }}>
                <Container>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px" }}>
                        <div style={{ maxWidth: "280px" }}>
                            <h4 style={{ color: "#f4a261" }}>PETMATCH</h4>
                            <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.7" }}>
                                PetMatch helps connect loving families with pets searching for safe and caring homes.
                            </p>
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>Quick Links</h6>
                            {[["Home", "/home"], ["Pets", "/list"], ["About Us", "/about"], ["Contact Us", "/contact"]].map(([label, path]) => (
                                <p key={path} style={{ cursor: "pointer" }} onClick={() => navigate(path)}>{label}</p>
                            ))}
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>Support</h6>
                            <p>Help Center</p><p>Privacy Policy</p><p>Terms & Conditions</p><p>Customer Support</p>
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>Contact</h6>
                            <p>Muscat, Oman</p><p>petmatch@gmail.com</p><p>+968 9999 9999</p>
                        </div>
                    </div>
                    <div style={{ borderTop: "1px solid #ddd", marginTop: "30px", paddingTop: "15px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <p style={{ margin: 0, color: "#777", fontSize: "13px" }}>© 2026 PETMATCH. All rights reserved.</p>
                        <p onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ margin: 0, cursor: "pointer", color: "#f4a261", fontWeight: "bold" }}>Back to top ↑</p>
                    </div>
                </Container>
            </div>
        </div>
    );
}
