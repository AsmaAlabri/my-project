import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
    const navigate = useNavigate();

    // Load user from localStorage (set during Register)
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        firstName: savedUser.firstName || "",
        lastName: savedUser.lastName || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
        city: savedUser.city || "Muscat",
        bio: savedUser.bio || "",
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify({ ...savedUser, ...form }));
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleLogout = () => {
        navigate("/");
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

            <Container style={{ paddingTop: "50px", paddingBottom: "60px" }}>

                {/* PROFILE HEADER CARD */}
                <div style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "35px",
                    marginBottom: "30px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    border: "1px solid #f4a261",
                    display: "flex",
                    alignItems: "center",
                    gap: "25px",
                    flexWrap: "wrap"
                }}>
                    {/* AVATAR */}
                    <div style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        backgroundColor: "#ffe5d0",
                        border: "4px solid #f4a261",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "42px",
                        flexShrink: 0
                    }}>
                        🐾
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0, fontWeight: "bold" }}>
                            {form.firstName || "User"} {form.lastName}
                        </h3>
                        <p style={{ color: "#555", margin: "4px 0 0 0", fontSize: "14px" }}>
                            📧 {form.email || "No email set"}
                        </p>
                        <p style={{ color: "#555", margin: "2px 0 0 0", fontSize: "14px" }}>
                            📍 {form.city}
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {!editing ? (
                            <Button
                                onClick={() => setEditing(true)}
                                style={{ backgroundColor: "#f4a261", border: "none", borderRadius: "10px", fontWeight: "bold" }}
                            >
                                ✏️ Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={handleSave}
                                    style={{ backgroundColor: "#f4a261", border: "none", borderRadius: "10px", fontWeight: "bold" }}
                                >
                                    💾 Save
                                </Button>
                                <Button
                                    onClick={() => setEditing(false)}
                                    style={{ backgroundColor: "#ccc", border: "none", borderRadius: "10px", color: "#333" }}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                        <Button
                            onClick={handleLogout}
                            style={{ backgroundColor: "#fff", border: "2px solid #f4a261", borderRadius: "10px", color: "#f4a261", fontWeight: "bold" }}
                        >
                            🚪 Logout
                        </Button>
                    </div>
                </div>

                {saved && (
                    <div style={{
                        backgroundColor: "#d4edda",
                        border: "1px solid #28a745",
                        borderRadius: "10px",
                        padding: "12px 20px",
                        marginBottom: "20px",
                        color: "#155724"
                    }}>
                        ✅ Profile saved successfully!
                    </div>
                )}

                <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>

                    {/* PERSONAL INFO FORM */}
                    <div style={{
                        flex: "1 1 380px",
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                        padding: "30px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                        border: "1px solid #ffe5d0"
                    }}>
                        <h5 style={{ color: "#f4a261", marginBottom: "20px" }}>Personal Information</h5>

                        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                            <FormGroup style={{ flex: 1 }}>
                                <Label style={{ fontWeight: "500", fontSize: "14px" }}>First Name</Label>
                                <Input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }}
                                />
                            </FormGroup>
                            <FormGroup style={{ flex: 1 }}>
                                <Label style={{ fontWeight: "500", fontSize: "14px" }}>Last Name</Label>
                                <Input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }}
                                />
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                disabled={!editing}
                                style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Phone Number</Label>
                            <Input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                disabled={!editing}
                                placeholder="+968 XXXX XXXX"
                                style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>City</Label>
                            <Input
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                disabled={!editing}
                                style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Bio</Label>
                            <Input
                                name="bio"
                                type="textarea"
                                rows="3"
                                value={form.bio}
                                onChange={handleChange}
                                disabled={!editing}
                                placeholder="Tell us a little about yourself and why you love pets..."
                                style={{ borderColor: "#f4a261", borderRadius: "10px", resize: "vertical", backgroundColor: editing ? "#fff" : "#f9f9f9" }}
                            />
                        </FormGroup>
                    </div>

                    {/* SIDE CARDS */}
                    <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: "20px" }}>

                        {/* ACTIVITY STATS */}
                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            padding: "25px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                            border: "1px solid #ffe5d0"
                        }}>
                            <h5 style={{ color: "#f4a261", marginBottom: "15px" }}>My Activity</h5>
                            {[
                                { emoji: "❤️", label: "Pets Favorited", count: "0" },
                                { emoji: "📋", label: "Applications Sent", count: "0" },
                                { emoji: "🏠", label: "Pets Adopted", count: "0" },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 0",
                                    borderBottom: i < 2 ? "1px solid #f2f2f2" : "none"
                                }}>
                                    <span style={{ fontSize: "14px" }}>{item.emoji} {item.label}</span>
                                    <span style={{ fontWeight: "bold", color: "#f4a261" }}>{item.count}</span>
                                </div>
                            ))}
                        </div>

                        {/* ACCOUNT SETTINGS */}
                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            padding: "25px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                            border: "1px solid #ffe5d0"
                        }}>
                            <h5 style={{ color: "#f4a261", marginBottom: "15px" }}>Account</h5>
                            {[
                                { emoji: "🔒", label: "Change Password" },
                                { emoji: "🔔", label: "Notifications" },
                                { emoji: "🗑️", label: "Delete Account" },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 0",
                                    borderBottom: i < 2 ? "1px solid #f2f2f2" : "none",
                                    cursor: "pointer",
                                    color: i === 2 ? "#dc3545" : "#333",
                                    fontSize: "14px"
                                }}>
                                    {item.emoji} {item.label}
                                </div>
                            ))}
                        </div>

                        {/* MEMBER SINCE */}
                        <div style={{
                            backgroundColor: "#f4a261",
                            borderRadius: "20px",
                            padding: "20px",
                            textAlign: "center",
                            color: "#fff"
                        }}>
                            <div style={{ fontSize: "30px" }}>🐾</div>
                            <p style={{ fontWeight: "bold", margin: "8px 0 2px 0" }}>PetMatch Member</p>
                            <p style={{ fontSize: "13px", margin: 0, opacity: 0.9 }}>Member since 2026</p>
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
