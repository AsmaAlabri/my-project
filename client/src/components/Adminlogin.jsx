import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Fixed admin credentials ──────────────────────────────────
const ADMIN_EMAIL    = "admin@petmatch.com";
const ADMIN_PASSWORD = "admin1234";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [showPw, setShowPw]     = useState(false);

    const handleLogin = () => {
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            setError("Invalid admin credentials.");
            return;
        }
        // Save admin session
        sessionStorage.setItem("isAdmin", "true");
        navigate("/admin");
    };

    const css = `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; }

        .al-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
        }

        .al-card {
            background: #fff;
            border-radius: 24px;
            padding: 48px 40px;
            width: 100%; max-width: 420px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }

        .al-logo {
            text-align: center;
            margin-bottom: 8px;
        }
        .al-logo-text {
            font-size: 22px; font-weight: 800;
            color: #f4a261; letter-spacing: 2px;
        }
        .al-badge {
            display: inline-block;
            background: #1a1a1a; color: #f4a261;
            font-size: 11px; font-weight: 700;
            padding: 3px 12px; border-radius: 20px;
            letter-spacing: 1px; margin-top: 4px;
        }

        .al-title {
            font-size: 24px; font-weight: 800;
            color: #1a1a1a; text-align: center;
            margin: 24px 0 6px;
        }
        .al-sub {
            font-size: 13px; color: #888;
            text-align: center; margin-bottom: 28px;
        }

        .al-error {
            background: #f8d7da; color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 10px; padding: 10px 14px;
            font-size: 13px; margin-bottom: 16px;
            text-align: center;
        }

        .al-label {
            display: block;
            font-size: 12px; font-weight: 700;
            color: #555; text-transform: uppercase;
            letter-spacing: 0.5px; margin-bottom: 6px;
        }
        .al-input-wrap {
            position: relative; margin-bottom: 16px;
        }
        .al-input {
            width: 100%; padding: 12px 16px;
            border: 2px solid #f0e8e0;
            border-radius: 12px; font-size: 15px;
            outline: none; transition: border 0.2s;
        }
        .al-input:focus { border-color: #f4a261; }
        .al-eye {
            position: absolute; right: 14px; top: 50%;
            transform: translateY(-50%);
            background: none; border: none;
            font-size: 16px; cursor: pointer; color: #aaa;
        }

        .al-btn {
            width: 100%; padding: 14px;
            background: #f4a261; color: #fff;
            border: none; border-radius: 12px;
            font-size: 16px; font-weight: 700;
            cursor: pointer; margin-top: 8px;
            transition: all 0.2s;
            box-shadow: 0 4px 16px rgba(244,162,97,0.4);
        }
        .al-btn:hover { background: #e8894a; transform: translateY(-2px); }

        .al-back {
            text-align: center; margin-top: 20px;
            font-size: 13px; color: #888;
        }
        .al-back span {
            color: #f4a261; cursor: pointer;
            font-weight: 600;
        }
        .al-back span:hover { text-decoration: underline; }

        .al-hint {
            background: #fff9f5; border: 1px solid #f4a261;
            border-radius: 10px; padding: 10px 14px;
            font-size: 12px; color: #888;
            margin-top: 20px; text-align: center;
            line-height: 1.6;
        }
        .al-hint strong { color: #f4a261; }
    `;

    return (
        <div className="al-page">
            <style>{css}</style>

            <div className="al-card">

                {/* LOGO */}
                <div className="al-logo">
                    <div className="al-logo-text">🐾 PETMATCH</div>
                    <div><span className="al-badge">ADMIN PORTAL</span></div>
                </div>

                <h2 className="al-title">Admin Login</h2>
                <p className="al-sub">Restricted access — authorized personnel only</p>

                {error && <div className="al-error">⚠️ {error}</div>}

                {/* EMAIL */}
                <label className="al-label">Admin Email</label>
                <div className="al-input-wrap">
                    <input
                        className="al-input"
                        type="email"
                        placeholder="admin@petmatch.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleLogin()}
                    />
                </div>

                {/* PASSWORD */}
                <label className="al-label">Password</label>
                <div className="al-input-wrap">
                    <input
                        className="al-input"
                        type={showPw ? "text" : "password"}
                        placeholder="Enter admin password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleLogin()}
                        style={{ paddingRight: "44px" }}
                    />
                   
                </div>

                <button className="al-btn" onClick={handleLogin}>
                    🔐 Login as Admin
                </button>

                <div className="al-back">
                    Not an admin?{" "}
                    <span onClick={() => navigate("/")}>Back to main site</span>
                </div>

                {/* HINT for development */}
                <div className="al-hint">
                    <strong>Dev hint:</strong><br />
                    Email: admin@petmatch.com<br />
                    Password: admin1234
                </div>

            </div>
        </div>
    );
}