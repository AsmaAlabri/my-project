import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { name, email, subject, message } = form;
        if (!name || !email || !subject || !message) {
            setError("Please fill in all fields.");
            return;
        }
        if (!email.includes("@")) {
            setError("Enter a valid email address.");
            return;
        }
        setError("");
        setSubmitted(true);
    };

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
            <Container style={{ paddingTop: "50px", paddingBottom: "20px" }}>
                <h1 style={{ fontWeight: "bold", color: "#000" }}>Contact Us 📬</h1>
                <p style={{ color: "#555", fontSize: "15px" }}>
                    Have a question or need help? We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
                </p>
            </Container>

            {/* MAIN CONTENT */}
            <Container style={{ marginBottom: "60px" }}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    alignItems: "flex-start"
                }}>

                    {/* CONTACT FORM */}
                    <div style={{
                        flex: "1 1 400px",
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                        padding: "35px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                        border: "1px solid #f4a261"
                    }}>
                        <h4 style={{ color: "#f4a261", marginBottom: "20px" }}>Send a Message</h4>

                        {submitted ? (
                            <div style={{ textAlign: "center", padding: "40px 0" }}>
                                <div style={{ fontSize: "60px" }}>🐾</div>
                                <h5 style={{ color: "#f4a261", marginTop: "15px" }}>Message Sent!</h5>
                                <p style={{ color: "#555" }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <Button
                                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                    style={{ backgroundColor: "#f4a261", border: "none", marginTop: "10px" }}
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <>
                                {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

                                <FormGroup>
                                    <Label style={{ fontWeight: "500" }}>Full Name</Label>
                                    <Input name="name" type="text" value={form.name} onChange={handleChange}
                                        placeholder="John Doe"
                                        style={{ borderColor: "#f4a261", borderRadius: "10px" }} />
                                </FormGroup>

                                <FormGroup>
                                    <Label style={{ fontWeight: "500" }}>Email</Label>
                                    <Input name="email" type="email" value={form.email} onChange={handleChange}
                                        placeholder="you@example.com"
                                        style={{ borderColor: "#f4a261", borderRadius: "10px" }} />
                                </FormGroup>

                                <FormGroup>
                                    <Label style={{ fontWeight: "500" }}>Subject</Label>
                                    <Input name="subject" type="text" value={form.subject} onChange={handleChange}
                                        placeholder="e.g. Adoption inquiry"
                                        style={{ borderColor: "#f4a261", borderRadius: "10px" }} />
                                </FormGroup>

                                <FormGroup>
                                    <Label style={{ fontWeight: "500" }}>Message</Label>
                                    <Input name="message" type="textarea" rows="5" value={form.message} onChange={handleChange}
                                        placeholder="Write your message here..."
                                        style={{ borderColor: "#f4a261", borderRadius: "10px", resize: "vertical" }} />
                                </FormGroup>

                                <Button onClick={handleSubmit} style={{
                                    backgroundColor: "#f4a261",
                                    border: "none",
                                    width: "100%",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    fontWeight: "bold"
                                }}>
                                    Send Message ✉️
                                </Button>
                            </>
                        )}
                    </div>

                    {/* CONTACT INFO */}
                    <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "20px" }}>

                        {[
                            { icon: "📍", title: "Our Location", info: "Muscat, Oman" },
                            { icon: "📧", title: "Email Us", info: "petmatch@gmail.com" },
                            { icon: "📞", title: "Call Us", info: "+968 9999 9999" },
                            { icon: "🕐", title: "Working Hours", info: "Sun – Thu: 9AM – 6PM" },
                        ].map((item, i) => (
                            <div key={i} style={{
                                backgroundColor: "#fff",
                                borderRadius: "15px",
                                padding: "20px 25px",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                                border: "1px solid #ffe5d0",
                                display: "flex",
                                alignItems: "center",
                                gap: "15px"
                            }}>
                                <div style={{ fontSize: "30px" }}>{item.icon}</div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>{item.title}</p>
                                    <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>{item.info}</p>
                                </div>
                            </div>
                        ))}

                        {/* SOCIAL LINKS */}
                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: "15px",
                            padding: "20px 25px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                            border: "1px solid #ffe5d0"
                        }}>
                            <p style={{ fontWeight: "bold", marginBottom: "12px" }}>Follow Us</p>
                            <div style={{ display: "flex", gap: "15px" }}>
                                {["bi-instagram", "bi-facebook", "bi-twitter-x", "bi-youtube"].map((icon, i) => (
                                    <i key={i} className={`bi ${icon}`} style={{ fontSize: "22px", cursor: "pointer", color: "#f4a261" }}></i>
                                ))}
                            </div>
                        </div>
                    </div>
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
