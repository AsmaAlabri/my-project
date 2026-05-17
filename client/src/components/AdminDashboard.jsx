import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

const EMPTY_CAT  = { name:"", breed:"", age:"", gender:"Male", city:"Muscat", image:"", available:true, vaccinated:false, neutered:false, trained:false, size:"Medium", description:"", latitude: "", longitude: "" };
const EMPTY_DOG  = { name:"", breed:"", age:"", gender:"Male", city:"Muscat", image:"", available:true, vaccinated:false, neutered:false, trained:false, size:"Medium", description:"", latitude: "", longitude: "" };
const EMPTY_BIRD = { name:"", breed:"", age:"", gender:"Male", city:"Muscat", image:"", available:true, vaccinated:false, neutered:false, trained:false, size:"Medium", description:"", latitude: "", longitude: "" };

const sanitize = (form) => ({
    ...form,
    age:       form.age       !== "" ? Number(form.age)       : null,
    weight:    form.weight    !== "" ? Number(form.weight)    : null,
    latitude:  form.latitude  !== "" ? Number(form.latitude)  : null,
    longitude: form.longitude !== "" ? Number(form.longitude) : null,
});

export default function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("isAdmin") !== "true") {
            navigate("/admin-login");
        }
    }, []);

    const handleAdminLogout = () => {
        sessionStorage.removeItem("isAdmin");
        navigate("/admin-login");
    };

    const [activeTab, setActiveTab]       = useState("cats");
    const [cats,  setCats]                = useState([]);
    const [dogs,  setDogs]                = useState([]);
    const [birds, setBirds]               = useState([]);
    const [loading, setLoading]           = useState(false);
    const [toast, setToast]               = useState(null);
    const [showModal, setShowModal]       = useState(false);
    const [modalMode, setModalMode]       = useState("create");
    const [modalType, setModalType]       = useState("cats");
    const [form, setForm]                 = useState({});
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch]             = useState("");

    // ── Fetch ─────────────────────────────────────────────────
    const fetchAll = async () => {
        setLoading(true);
        try {
            const [c, d, b] = await Promise.all([
                fetch(`${API}/cats`).then(r => r.json()),
                fetch(`${API}/dogs`).then(r => r.json()),
                fetch(`${API}/birds`).then(r => r.json()),
            ]);
            setCats(Array.isArray(c) ? c : []);
            setDogs(Array.isArray(d) ? d : []);
            setBirds(Array.isArray(b) ? b : []);
        } catch {
            showToast("❌ Could not connect to server", "error");
        }
        setLoading(false);
    };

    useEffect(() => { fetchAll(); }, []);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const openCreate = (type) => {
        setModalMode("create");
        setModalType(type);
        setForm(type === "cats" ? { ...EMPTY_CAT } : type === "dogs" ? { ...EMPTY_DOG } : { ...EMPTY_BIRD });
        setShowModal(true);
    };

    const openEdit = (type, pet) => {
        setModalMode("edit");
        setModalType(type);
        setForm({ ...pet });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    // ── CREATE ────────────────────────────────────────────────
    const handleCreate = async () => {
        if (!form.name || !form.breed || !form.age) {
            showToast("⚠️ Name, Breed and Age are required", "error");
            return;
        }
        try {
            const res = await fetch(`${API}/${modalType}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitize(form)),
            });
            if (!res.ok) throw new Error();
            showToast(`✅ ${form.name} added successfully!`);
            setShowModal(false);
            fetchAll();
        } catch {
            showToast("❌ Failed to create pet", "error");
        }
    };

    // ── UPDATE ────────────────────────────────────────────────
    const handleUpdate = async () => {
        if (!form.name || !form.breed || !form.age) {
            showToast("⚠️ Name, Breed and Age are required", "error");
            return;
        }
        try {
            const res = await fetch(`${API}/${modalType}/${form._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitize(form)),
            });
            if (!res.ok) throw new Error();
            showToast(`✅ ${form.name} updated successfully!`);
            setShowModal(false);
            fetchAll();
        } catch {
            showToast("❌ Failed to update pet", "error");
        }
    };

    // ── DELETE ────────────────────────────────────────────────
    const handleDelete = async () => {
        try {
            const res = await fetch(`${API}/${deleteTarget.type}/${deleteTarget.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            showToast(`🗑️ ${deleteTarget.name} deleted`);
            setDeleteTarget(null);
            fetchAll();
        } catch {
            showToast("❌ Failed to delete", "error");
        }
    };

    const filtered = (list) =>
        list.filter(p =>
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.breed?.toLowerCase().includes(search.toLowerCase()) ||
            p.city?.toLowerCase().includes(search.toLowerCase())
        );

    const currentList = filtered(activeTab === "cats" ? cats : activeTab === "dogs" ? dogs : birds);

    const stats = [
        { label: "Total Cats",  value: cats.length,  emoji: "🐱", color: "#f4a261" },
        { label: "Total Dogs",  value: dogs.length,  emoji: "🐶", color: "#e07b39" },
        { label: "Total Birds", value: birds.length, emoji: "🦜", color: "#c9622f" },
        { label: "Available",   value: [...cats,...dogs,...birds].filter(p => p.available).length, emoji: "✅", color: "#28a745" },
    ];

    const css = `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; }
        .admin-page { background: #f7f3ef; min-height: 100vh; }

        .admin-nav {
            background: #1a1a1a;
            padding: 0 30px; height: 62px;
            display: flex; justify-content: space-between; align-items: center;
            position: sticky; top: 0; z-index: 50;
            box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .admin-logo { color: #f4a261; font-size: 20px; font-weight: 800; letter-spacing: 1px; }
        .admin-nav-right { display: flex; gap: 10px; align-items: center; }
        .nav-badge { background: #f4a261; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 1px; }
        .nav-logout-btn { background: #dc3545; color: #fff; border: none; padding: 7px 18px; border-radius: 20px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .nav-logout-btn:hover { background: #b02a37; }

        .admin-main { max-width: 1200px; margin: 0 auto; padding: 30px 20px; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 30px; }
        .stat-card { background: #fff; border-radius: 16px; padding: 20px 24px; border: 1px solid #f0e8e0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 16px; }
        .stat-emoji { font-size: 36px; }
        .stat-num { font-size: 28px; font-weight: 800; line-height: 1; }
        .stat-label { font-size: 13px; color: #888; margin-top: 2px; }

        .tab-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .tab-btn { padding: 10px 24px; border-radius: 30px; border: 2px solid #f4a261; background: #fff; color: #f4a261; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .tab-btn.active { background: #f4a261; color: #fff; }
        .tab-btn:hover:not(.active) { background: #fff4ec; }

        .toolbar { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .search-input { flex: 1; min-width: 200px; padding: 10px 16px; border: 2px solid #f0e8e0; border-radius: 30px; font-size: 14px; outline: none; transition: border 0.2s; }
        .search-input:focus { border-color: #f4a261; }
        .add-btn { background: #f4a261; color: #fff; border: none; padding: 10px 24px; border-radius: 30px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .add-btn:hover { background: #e8894a; transform: translateY(-1px); }

        .table-wrap { background: #fff; border-radius: 16px; border: 1px solid #f0e8e0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 700px; }
        thead { background: #fff9f5; }
        th { padding: 14px 16px; text-align: left; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; border-bottom: 1px solid #f0e8e0; }
        td { padding: 14px 16px; font-size: 14px; color: #333; border-bottom: 1px solid #faf5f0; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fffaf7; }
        .pet-img { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; border: 2px solid #f4a261; }
        .pet-name { font-weight: 700; color: #1a1a1a; }
        .pet-breed { font-size: 12px; color: #888; margin-top: 2px; }

        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .badge-green { background: #d4edda; color: #155724; }
        .badge-red   { background: #f8d7da; color: #721c24; }
        .badge-blue  { background: #d1ecf1; color: #0c5460; }
        .badge-gray  { background: #e2e3e5; color: #383d41; }

        .action-btns { display: flex; gap: 8px; }
        .edit-btn { background: #fff4ec; color: #f4a261; border: 1px solid #f4a261; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .edit-btn:hover { background: #f4a261; color: #fff; }
        .del-btn { background: #fff0f0; color: #dc3545; border: 1px solid #dc3545; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .del-btn:hover { background: #dc3545; color: #fff; }

        .empty { text-align: center; padding: 60px 20px; color: #aaa; }
        .empty-emoji { font-size: 60px; margin-bottom: 16px; }

        .pm-overlay {
            position: fixed !important;
            inset: 0 !important;
            background: rgba(0,0,0,0.55) !important;
            z-index: 99999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 20px !important;
        }
        .pm-modal {
            background: #ffffff !important;
            color: #333 !important;
            border-radius: 20px !important;
            padding: 32px !important;
            width: 100% !important;
            max-width: 580px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
            position: relative !important;
            z-index: 100000 !important;
        }
        .pm-modal-title { font-size: 20px; font-weight: 800; color: #f4a261; margin-bottom: 24px; }
        .pm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .pm-form-group { display: flex; flex-direction: column; gap: 6px; }
        .pm-form-group.full { grid-column: 1 / -1; }
        .pm-label { font-size: 12px !important; font-weight: 700 !important; color: #555 !important; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
        .pm-input { padding: 10px 14px !important; border: 2px solid #f0e8e0 !important; border-radius: 10px !important; font-size: 14px !important; outline: none !important; width: 100% !important; background: #fff !important; color: #333 !important; }
        .pm-input:focus { border-color: #f4a261 !important; }
        .pm-textarea { padding: 10px 14px !important; border: 2px solid #f0e8e0 !important; border-radius: 10px !important; font-size: 14px !important; outline: none !important; width: 100% !important; resize: vertical; min-height: 70px; background: #fff !important; color: #333 !important; }
        .pm-select { padding: 10px 14px !important; border: 2px solid #f0e8e0 !important; border-radius: 10px !important; font-size: 14px !important; outline: none !important; width: 100% !important; background: #fff !important; color: #333 !important; }
        .pm-checkbox-row { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 4px; }
        .pm-checkbox-item { display: flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; color: #333; }
        .pm-modal-actions { display: flex; gap: 12px; margin-top: 24px; }
        .pm-save-btn { flex: 1; background: #f4a261 !important; color: #fff !important; border: none; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pm-save-btn:hover { background: #e8894a !important; }
        .pm-cancel-btn { flex: 1; background: #f0f0f0 !important; color: #555 !important; border: none; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; }

        .pm-del-modal {
            background: #ffffff !important;
            color: #333 !important;
            border-radius: 20px !important;
            padding: 36px !important;
            width: 100% !important;
            max-width: 400px !important;
            text-align: center !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
            position: relative !important;
            z-index: 100000 !important;
        }
        .pm-del-modal h3 { color: #dc3545; margin: 12px 0 8px; font-size: 20px; }
        .pm-del-modal p  { color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
        .pm-del-confirm-btn { background: #dc3545 !important; color: #fff !important; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; margin-right: 10px; }
        .pm-del-cancel-btn  { background: #f0f0f0 !important; color: #555 !important; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; }

        .toast { position: fixed; bottom: 30px; right: 30px; z-index: 999999; padding: 14px 24px; border-radius: 12px; font-weight: 600; font-size: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); animation: slideIn 0.3s ease; }
        .toast-success { background: #d4edda; color: #155724; border: 1px solid #28a745; }
        .toast-error   { background: #f8d7da; color: #721c24; border: 1px solid #dc3545; }
        @keyframes slideIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

        @media (max-width: 600px) {
            .pm-form-grid { grid-template-columns: 1fr; }
            .admin-nav { padding: 0 16px; }
        }
    `;

    const renderExtraFields = () => {
        if (modalType === "cats") return (
            <div className="pm-form-group">
                <span className="pm-label">Cat Traits</span>
                <div className="pm-checkbox-row">
                    <label className="pm-checkbox-item"><input type="checkbox" name="indoor" checked={!!form.indoor} onChange={handleChange} /> Indoor</label>
                    <label className="pm-checkbox-item"><input type="checkbox" name="longhaired" checked={!!form.longhaired} onChange={handleChange} /> Long-haired</label>
                </div>
            </div>
        );
        if (modalType === "dogs") return (
            <>
                <div className="pm-form-group">
                    <span className="pm-label">Size</span>
                    <select className="pm-select" name="size" value={form.size || "Medium"} onChange={handleChange}>
                        <option>Small</option><option>Medium</option><option>Large</option>
                    </select>
                </div>
                <div className="pm-form-group">
                    <span className="pm-label">Dog Traits</span>
                    <div className="pm-checkbox-row">
                        <label className="pm-checkbox-item"><input type="checkbox" name="trained" checked={!!form.trained} onChange={handleChange} /> Trained</label>
                    </div>
                </div>
            </>
        );
        if (modalType === "birds") return (
            <>
                <div className="pm-form-group">
                    <span className="pm-label">Wingspan (cm)</span>
                    <input className="pm-input" type="number" name="wingspan" value={form.wingspan || ""} onChange={handleChange} placeholder="e.g. 35" />
                </div>
                <div className="pm-form-group">
                    <span className="pm-label">Bird Traits</span>
                    <div className="pm-checkbox-row">
                        <label className="pm-checkbox-item"><input type="checkbox" name="canTalk" checked={!!form.canTalk} onChange={handleChange} /> Can Talk</label>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="admin-page">
            <style>{css}</style>

            {/* TOAST */}
            {toast && (
                <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
                    {toast.msg}
                </div>
            )}

            {/* NAVBAR */}
            <nav className="admin-nav">
                <div className="admin-logo">🐾 PETMATCH</div>
                <div className="admin-nav-right">
                    <span className="nav-badge">⚙️ ADMIN</span>
                    <button className="nav-logout-btn" onClick={handleAdminLogout}>🚪 Logout</button>
                </div>
            </nav>

            <div className="admin-main">
                <div style={{ marginBottom: "24px" }}>
                    <h2 style={{ fontWeight: "800", color: "#1a1a1a", fontSize: "26px" }}>Pet Management</h2>
                    <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>Create, view, edit and delete pet listings</p>
                </div>

                {/* STATS */}
                <div className="stats-grid">
                    {stats.map((s, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-emoji">{s.emoji}</div>
                            <div>
                                <div className="stat-num" style={{ color: s.color }}>{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TABS */}
                <div className="tab-row">
                    {["cats", "dogs", "birds"].map(t => (
                        <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`}
                            onClick={() => { setActiveTab(t); setSearch(""); }}>
                            {t === "cats" ? "🐱" : t === "dogs" ? "🐶" : "🦜"} {t.charAt(0).toUpperCase() + t.slice(1)}
                            <span style={{ marginLeft: "6px", fontSize: "12px", opacity: 0.8 }}>
                                ({t === "cats" ? cats.length : t === "dogs" ? dogs.length : birds.length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* TOOLBAR */}
                <div className="toolbar">
                    <input className="search-input"
                        placeholder={`🔍 Search ${activeTab} by name, breed or city...`}
                        value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="add-btn" onClick={() => openCreate(activeTab)}>
                        + Add {activeTab === "cats" ? "Cat 🐱" : activeTab === "dogs" ? "Dog 🐶" : "Bird 🦜"}
                    </button>
                </div>

                {/* TABLE */}
                {loading ? (
                    <div style={{ textAlign: "center", padding: "60px", color: "#f4a261", fontSize: "18px" }}>Loading... 🐾</div>
                ) : (
                    <div className="table-wrap">
                        {currentList.length === 0 ? (
                            <div className="empty">
                                <div className="empty-emoji">{activeTab === "cats" ? "🐱" : activeTab === "dogs" ? "🐶" : "🦜"}</div>
                                <p>No {activeTab} found. Add one!</p>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pet</th><th>Age</th><th>Gender</th>
                                        <th>Weight</th><th>City</th><th>Vaccinated</th>
                                        <th>Status</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentList.map(pet => (
                                        <tr key={pet._id}>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                    <img className="pet-img"
                                                        src={pet.image || "https://via.placeholder.com/48"}
                                                        alt={pet.name}
                                                        onError={e => e.target.src = "https://via.placeholder.com/48"} />
                                                    <div>
                                                        <div className="pet-name">{pet.name}</div>
                                                        <div className="pet-breed">{pet.breed}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{pet.age} yr{pet.age !== 1 ? "s" : ""}</td>
                                            <td>{pet.gender}</td>
                                            <td>{pet.weight ? `${pet.weight} kg` : "—"}</td>
                                            <td>{pet.city}</td>
                                            <td><span className={`badge ${pet.vaccinated ? "badge-green" : "badge-red"}`}>{pet.vaccinated ? "Yes" : "No"}</span></td>
                                            <td><span className={`badge ${pet.available ? "badge-blue" : "badge-gray"}`}>{pet.available ? "Available" : "Adopted"}</span></td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="edit-btn" onClick={() => openEdit(activeTab, pet)}>✏️ Edit</button>
                                                    <button className="del-btn"  onClick={() => setDeleteTarget({ type: activeTab, id: pet._id, name: pet.name })}>🗑️ Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>

            {/* CREATE / EDIT MODAL — rendered via portal directly on document.body */}
            {showModal && createPortal(
                <div className="pm-overlay" onClick={() => setShowModal(false)}>
                    <div className="pm-modal" onClick={e => e.stopPropagation()}>
                        <div className="pm-modal-title">
                            {modalMode === "create" ? "➕ Add New" : "✏️ Edit"}{" "}
                            {modalType === "cats" ? "Cat 🐱" : modalType === "dogs" ? "Dog 🐶" : "Bird 🦜"}
                        </div>
                        <div className="pm-form-grid">
                            <div className="pm-form-group">
                                <span className="pm-label">Name *</span>
                                <input className="pm-input" type="text" name="name" value={form.name || ""} onChange={handleChange} placeholder="e.g. Luna" />
                            </div>
                            <div className="pm-form-group">
                                <span className="pm-label">Breed *</span>
                                <input className="pm-input" type="text" name="breed" value={form.breed || ""} onChange={handleChange} placeholder="e.g. Persian" />
                            </div>
                            <div className="pm-form-group">
                                <span className="pm-label">Age (years) *</span>
                                <input className="pm-input" type="number" name="age" value={form.age || ""} onChange={handleChange} placeholder="e.g. 2" min="0" />
                            </div>
                            <div className="pm-form-group">
                                <span className="pm-label">Gender</span>
                                <select className="pm-select" name="gender" value={form.gender || "Male"} onChange={handleChange}>
                                    <option>Male</option><option>Female</option>
                                </select>
                            </div>
                            <div className="pm-form-group">
                                <span className="pm-label">City</span>
                                <select className="pm-select" name="city" value={form.city || "Muscat"} onChange={handleChange}>
                                    <option>Muscat</option><option>Salalah</option><option>Nizwa</option><option>Sohar</option><option>Sur</option>
                                </select>
                            </div>
                            {renderExtraFields()}
                            <div className="pm-form-group full">
                                <span className="pm-label">Image URL</span>
                                <input className="pm-input" type="url" name="image" value={form.image || ""} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div className="pm-form-group full">
                                <span className="pm-label">Description</span>
                                <textarea className="pm-textarea" name="description" value={form.description || ""} onChange={handleChange} placeholder="Write a short description..." />
                            </div>
                            <div className="pm-form-group full">
                                <span className="pm-label">Options</span>
                                <div className="pm-checkbox-row">
                                    <label className="pm-checkbox-item"><input type="checkbox" name="vaccinated" checked={!!form.vaccinated} onChange={handleChange} /> Vaccinated</label>
                                    <label className="pm-checkbox-item"><input type="checkbox" name="neutered"   checked={!!form.neutered}   onChange={handleChange} /> Neutered</label>
                                    <label className="pm-checkbox-item"><input type="checkbox" name="available"  checked={!!form.available}  onChange={handleChange} /> Available</label>
                                </div>
                            </div>
                            <div className="pm-form-group">
                                <span className="pm-label">Latitude</span>
                                <input className="pm-input" type="number" name="latitude" value={form.latitude || ""} onChange={handleChange} placeholder="e.g. 23.6131" step="any" />
                            </div>
                            <div className="pm-form-group">
                                <span className="pm-label">Longitude</span>
                                <input className="pm-input" type="number" name="longitude" value={form.longitude || ""} onChange={handleChange} placeholder="e.g. 58.5922" step="any" />
                            </div>
                        </div>
                        <div className="pm-modal-actions">
                            <button className="pm-save-btn" onClick={modalMode === "create" ? handleCreate : handleUpdate}>
                                {modalMode === "create" ? "➕ Add Pet" : "💾 Save Changes"}
                            </button>
                            <button className="pm-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* DELETE CONFIRM — also via portal */}
            {deleteTarget && createPortal(
                <div className="pm-overlay" onClick={() => setDeleteTarget(null)}>
                    <div className="pm-del-modal" onClick={e => e.stopPropagation()}>
                        <div style={{ fontSize: "52px" }}>⚠️</div>
                        <h3>Delete Pet</h3>
                        <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</p>
                        <button className="pm-del-confirm-btn" onClick={handleDelete}>🗑️ Yes, Delete</button>
                        <button className="pm-del-cancel-btn"  onClick={() => setDeleteTarget(null)}>Cancel</button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
