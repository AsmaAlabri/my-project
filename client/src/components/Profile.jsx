import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
    const navigate = useNavigate();

    const getSavedUser = () => JSON.parse(localStorage.getItem("user")) || {};

    const [form, setForm] = useState(() => {
        const u = getSavedUser();
        return {
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            email: u.email || "",
            phone: u.phone || "",
            city: u.city || "Muscat",
            bio: u.bio || "",
        };
    });

    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    // ── Change Password state ──
    const [showChangePw, setShowChangePw] = useState(false);
    const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");

    // ── Delete Account state ──
    const [showDelete, setShowDelete] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState("");
    const [deleteError, setDeleteError] = useState("");

    // ── Profile handlers ──
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = () => {
        const current = getSavedUser();
        localStorage.setItem("user", JSON.stringify({ ...current, ...form }));
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleLogout = () => navigate("/");

    // ── Change Password handlers ──
    const handlePwChange = (e) => setPwForm({ ...pwForm, [e.target.name]: e.target.value });

    const handleChangePassword = () => {
        const user = getSavedUser();
        setPwError("");
        setPwSuccess("");

        if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
            setPwError("Please fill in all fields.");
            return;
        }
        if (pwForm.current !== user.password) {
            setPwError("Current password is incorrect.");
            return;
        }
        if (pwForm.newPw.length < 6) {
            setPwError("New password must be at least 6 characters.");
            return;
        }
        if (pwForm.newPw !== pwForm.confirm) {
            setPwError("New passwords do not match.");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ ...user, password: pwForm.newPw }));
        setPwSuccess("✅ Password changed successfully!");
        setPwForm({ current: "", newPw: "", confirm: "" });
        setTimeout(() => { setShowChangePw(false); setPwSuccess(""); }, 2000);
    };

    // ── Delete Account handlers ──
    const handleDeleteAccount = () => {
        setDeleteError("");
        if (deleteConfirm !== "DELETE") {
            setDeleteError('Please type "DELETE" to confirm.');
            return;
        }
        localStorage.removeItem("user");
        navigate("/");
    };

    // ── Shared modal styles ──
    const modalOverlay = {
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000
    };
    const modalBox = {
        backgroundColor: "#fff",
        borderRadius: "20px",
        padding: "35px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        border: "1px solid #f4a261",
        margin: "20px"
    };

    return (
        <div style={{ background: "linear-gradient(to right, #f2f2f2, #ffe5d0)", minHeight: "100vh" }}>

            {/* ── CHANGE PASSWORD MODAL ── */}
            {showChangePw && (
                <div style={modalOverlay} onClick={() => setShowChangePw(false)}>
                    <div style={modalBox} onClick={(e) => e.stopPropagation()}>
                        <h5 style={{ color: "#f4a261", marginBottom: "20px" }}>🔒 Change Password</h5>

                        {pwError && (
                            <div style={{ backgroundColor: "#f8d7da", border: "1px solid #dc3545", borderRadius: "10px", padding: "10px 15px", marginBottom: "15px", color: "#721c24", fontSize: "14px" }}>
                                {pwError}
                            </div>
                        )}
                        {pwSuccess && (
                            <div style={{ backgroundColor: "#d4edda", border: "1px solid #28a745", borderRadius: "10px", padding: "10px 15px", marginBottom: "15px", color: "#155724", fontSize: "14px" }}>
                                {pwSuccess}
                            </div>
                        )}

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Current Password</Label>
                            <Input name="current" type="password" value={pwForm.current}
                                onChange={handlePwChange} placeholder="Enter current password"
                                style={{ borderColor: "#f4a261", borderRadius: "10px" }} />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>New Password</Label>
                            <Input name="newPw" type="password" value={pwForm.newPw}
                                onChange={handlePwChange} placeholder="At least 6 characters"
                                style={{ borderColor: "#f4a261", borderRadius: "10px" }} />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Confirm New Password</Label>
                            <Input name="confirm" type="password" value={pwForm.confirm}
                                onChange={handlePwChange} placeholder="Repeat new password"
                                style={{ borderColor: "#f4a261", borderRadius: "10px" }} />
                        </FormGroup>

                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <Button onClick={handleChangePassword}
                                style={{ backgroundColor: "#f4a261", border: "none", borderRadius: "10px", fontWeight: "bold", flex: 1 }}>
                                Save Password
                            </Button>
                            <Button onClick={() => { setShowChangePw(false); setPwError(""); setPwForm({ current: "", newPw: "", confirm: "" }); }}
                                style={{ backgroundColor: "#ccc", border: "none", borderRadius: "10px", color: "#333", flex: 1 }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── DELETE ACCOUNT MODAL ── */}
            {showDelete && (
                <div style={modalOverlay} onClick={() => setShowDelete(false)}>
                    <div style={modalBox} onClick={(e) => e.stopPropagation()}>
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <div style={{ fontSize: "50px" }}>⚠️</div>
                            <h5 style={{ color: "#dc3545", marginTop: "10px" }}>Delete Account</h5>
                            <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.7" }}>
                                This will permanently delete your account and all your data.
                                This action <strong>cannot be undone</strong>.
                            </p>
                        </div>

                        {deleteError && (
                            <div style={{ backgroundColor: "#f8d7da", border: "1px solid #dc3545", borderRadius: "10px", padding: "10px 15px", marginBottom: "15px", color: "#721c24", fontSize: "14px" }}>
                                {deleteError}
                            </div>
                        )}

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>
                                Type <strong>DELETE</strong> to confirm
                            </Label>
                            <Input type="text" value={deleteConfirm}
                                onChange={(e) => setDeleteConfirm(e.target.value)}
                                placeholder="DELETE"
                                style={{ borderColor: "#dc3545", borderRadius: "10px", textAlign: "center", letterSpacing: "2px", fontWeight: "bold" }} />
                        </FormGroup>

                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <Button onClick={handleDeleteAccount}
                                style={{ backgroundColor: "#dc3545", border: "none", borderRadius: "10px", fontWeight: "bold", flex: 1 }}>
                                🗑️ Delete Account
                            </Button>
                            <Button onClick={() => { setShowDelete(false); setDeleteConfirm(""); setDeleteError(""); }}
                                style={{ backgroundColor: "#ccc", border: "none", borderRadius: "10px", color: "#333", flex: 1 }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* NAVBAR */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #f4e4d0",
                    padding: "0 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "64px",
                    boxShadow: "0 4px 24px rgba(244,162,97,0.12)"
                }}
            >
                <div
                    style={{
                        fontFamily: "serif",
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#f4a261",
                        letterSpacing: "1px"
                    }}
                >
                    PETMATCH
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                    {[
                        { label: "Home", to: "/home" },
                        { label: "About Us", to: "/about" },
                        { label: "Contact Us", to: "/contact" },
                        { label: "Profile", to: "/profile" },
                    ].map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            style={({ isActive }) => ({
                                color: isActive ? "#f4a261" : "#555",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                                padding: "8px 16px",
                                borderRadius: "30px",
                                background: isActive ? "#fff4ec" : "transparent"
                            })}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            <Container style={{ paddingTop: "50px", paddingBottom: "60px" }}>

                {/* PROFILE HEADER */}
                <div style={{
                    backgroundColor: "#fff", borderRadius: "20px", padding: "35px", marginBottom: "30px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: "1px solid #f4a261",
                    display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap"
                }}>
                    <div style={{
                        width: "90px", height: "90px", borderRadius: "50%",
                        backgroundColor: "#ffe5d0", border: "4px solid #f4a261",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "42px", flexShrink: 0
                    }}>🐾</div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0, fontWeight: "bold" }}>{form.firstName || "User"} {form.lastName}</h3>
                        <p style={{ color: "#555", margin: "4px 0 0 0", fontSize: "14px" }}>📧 {form.email || "No email set"}</p>
                        <p style={{ color: "#555", margin: "2px 0 0 0", fontSize: "14px" }}>📍 {form.city}</p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {!editing ? (
                            <Button onClick={() => setEditing(true)}
                                style={{ backgroundColor: "#f4a261", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
                                ✏️ Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button onClick={handleSave}
                                    style={{ backgroundColor: "#f4a261", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
                                    💾 Save
                                </Button>
                                <Button onClick={() => setEditing(false)}
                                    style={{ backgroundColor: "#ccc", border: "none", borderRadius: "10px", color: "#333" }}>
                                    Cancel
                                </Button>
                            </>
                        )}
                        <Button onClick={handleLogout}
                            style={{ backgroundColor: "#fff", border: "2px solid #f4a261", borderRadius: "10px", color: "#f4a261", fontWeight: "bold" }}>
                            🚪 Logout
                        </Button>
                    </div>
                </div>

                {saved && (
                    <div style={{ backgroundColor: "#d4edda", border: "1px solid #28a745", borderRadius: "10px", padding: "12px 20px", marginBottom: "20px", color: "#155724" }}>
                        ✅ Profile saved successfully!
                    </div>
                )}

                <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>

                    {/* PERSONAL INFO */}
                    <div style={{
                        flex: "1 1 380px", backgroundColor: "#fff", borderRadius: "20px",
                        padding: "30px", boxShadow: "0 4px 15px rgba(0,0,0,0.07)", border: "1px solid #ffe5d0"
                    }}>
                        <h5 style={{ color: "#f4a261", marginBottom: "20px" }}>Personal Information</h5>

                        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                            <FormGroup style={{ flex: 1 }}>
                                <Label style={{ fontWeight: "500", fontSize: "14px" }}>First Name</Label>
                                <Input name="firstName" value={form.firstName} onChange={handleChange} disabled={!editing}
                                    style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }} />
                            </FormGroup>
                            <FormGroup style={{ flex: 1 }}>
                                <Label style={{ fontWeight: "500", fontSize: "14px" }}>Last Name</Label>
                                <Input name="lastName" value={form.lastName} onChange={handleChange} disabled={!editing}
                                    style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }} />
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Email</Label>
                            <Input name="email" type="email" value={form.email} onChange={handleChange} disabled={!editing}
                                style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }} />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Phone Number</Label>
                            <Input name="phone" type="tel" value={form.phone} onChange={handleChange} disabled={!editing}
                                placeholder="+968 XXXX XXXX"
                                style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }} />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>City</Label>
                            <Input name="city" value={form.city} onChange={handleChange} disabled={!editing}
                                style={{ borderColor: "#f4a261", borderRadius: "10px", backgroundColor: editing ? "#fff" : "#f9f9f9" }} />
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ fontWeight: "500", fontSize: "14px" }}>Bio</Label>
                            <Input name="bio" type="textarea" rows="3" value={form.bio} onChange={handleChange} disabled={!editing}
                                placeholder="Tell us a little about yourself and why you love pets..."
                                style={{ borderColor: "#f4a261", borderRadius: "10px", resize: "vertical", backgroundColor: editing ? "#fff" : "#f9f9f9" }} />
                        </FormGroup>
                    </div>

                    {/* SIDE CARDS */}
                    <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: "20px" }}>

                        {/* ACTIVITY */}
                        <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.07)", border: "1px solid #ffe5d0" }}>
                            <h5 style={{ color: "#f4a261", marginBottom: "15px" }}>My Activity</h5>
                            {[
                                { emoji: "❤️", label: "Pets Favorited", count: "0" },
                                { emoji: "📋", label: "Applications Sent", count: "0" },
                                { emoji: "🏠", label: "Pets Adopted", count: "0" },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "10px 0", borderBottom: i < 2 ? "1px solid #f2f2f2" : "none"
                                }}>
                                    <span style={{ fontSize: "14px" }}>{item.emoji} {item.label}</span>
                                    <span style={{ fontWeight: "bold", color: "#f4a261" }}>{item.count}</span>
                                </div>
                            ))}
                        </div>

                        {/* ACCOUNT SETTINGS */}
                        <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.07)", border: "1px solid #ffe5d0" }}>
                            <h5 style={{ color: "#f4a261", marginBottom: "15px" }}>Account</h5>

                            <div onClick={() => setShowChangePw(true)}
                                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 0", borderBottom: "1px solid #f2f2f2", cursor: "pointer", fontSize: "14px", color: "#333" }}
                                onMouseEnter={e => e.currentTarget.style.color = "#f4a261"}
                                onMouseLeave={e => e.currentTarget.style.color = "#333"}>
                                🔒 Change Password
                                <span style={{ marginLeft: "auto", color: "#ccc" }}>›</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 0", borderBottom: "1px solid #f2f2f2", cursor: "pointer", fontSize: "14px", color: "#333" }}>
                                🔔 Notifications
                                <span style={{ marginLeft: "auto", color: "#ccc" }}>›</span>
                            </div>

                            <div onClick={() => setShowDelete(true)}
                                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 0", cursor: "pointer", fontSize: "14px", color: "#dc3545", fontWeight: "500" }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                                🗑️ Delete Account
                                <span style={{ marginLeft: "auto" }}>›</span>
                            </div>
                        </div>

                        {/* MEMBER CARD */}
                        <div style={{ backgroundColor: "#f4a261", borderRadius: "20px", padding: "20px", textAlign: "center", color: "#fff" }}>
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
                            {[["Home", "/home"],  ["About Us", "/about"], ["Contact Us", "/contact"]].map(([label, path]) => (
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
