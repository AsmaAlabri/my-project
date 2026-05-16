import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Col, Row } from "reactstrap";


export default function BirdList() {
    const navigate = useNavigate();
    const [birds, setBirds]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState("");
    const [search, setSearch]   = useState("");
    const [filter, setFilter]   = useState("all"); // all | available | adopted


    // ── Fetch birds from MongoDB ───────────────────────────────
    useEffect(() => {
        fetch("http://localhost:5000/api/birds")
            .then(res => res.json())
            .then(data => {
                setBirds(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setError("Could not load birds. Make sure the server is running.");
                setLoading(false);
            });
    }, []);

    // ── Filter + Search ───────────────────────────────────────
    const displayed = birds.filter(bird => {
        const matchSearch =
            bird.name?.toLowerCase().includes(search.toLowerCase()) ||
            bird.breed?.toLowerCase().includes(search.toLowerCase()) ||
            bird.city?.toLowerCase().includes(search.toLowerCase());

        const matchFilter =
            filter === "all" ? true :
            filter === "available" ? bird.available :
            !bird.available;

        return matchSearch && matchFilter;
    });

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
                        { label: "Home",       to: "/home"    },
                        { label: "About Us",   to: "/about"   },
                        { label: "Contact Us", to: "/contact" },
                        { label: "Profile",    to: "/profile" },
                    ].map(link => (
                        <NavLink key={link.to} to={link.to}
                            style={{ color: "#f4a261", textDecoration: "none" }}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            <Container style={{ paddingTop: "40px", paddingBottom: "60px" }}>

                {/* HEADER */}
                <div style={{ marginBottom: "30px" }}>
                    <h2 style={{ fontWeight: "bold", color: "#1a1a1a" }}>🐦 Birds for Adoption</h2>
                    <p style={{ color: "#666", fontSize: "15px" }}>
                        Find your perfect feathered companion from our available birds.
                    </p>
                </div>

                {/* SEARCH + FILTER */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                    <input
                        type="text"
                        placeholder="🔍 Search by name, breed or city..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            flex: 1, minWidth: "220px",
                            padding: "10px 18px",
                            borderRadius: "30px",
                            border: "2px solid #f4a261",
                            fontSize: "14px", outline: "none"
                        }}
                    />
                    {["all", "available", "adopted"].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{
                                padding: "10px 22px", borderRadius: "30px",
                                border: "2px solid #f4a261",
                                background: filter === f ? "#f4a261" : "#fff",
                                color: filter === f ? "#fff" : "#f4a261",
                                fontWeight: "600", fontSize: "14px", cursor: "pointer"
                            }}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* LOADING */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <div style={{ fontSize: "50px" }}>🐦</div>
                        <p style={{ color: "#f4a261", fontWeight: "600", marginTop: "12px" }}>
                            Loading birds...
                        </p>
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div style={{
                        background: "#f8d7da", border: "1px solid #dc3545",
                        borderRadius: "12px", padding: "16px 20px",
                        color: "#721c24", marginBottom: "20px"
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* EMPTY */}
                {!loading && !error && displayed.length === 0 && (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
                        <div style={{ fontSize: "60px" }}>🐦</div>
                        <p style={{ marginTop: "12px", fontSize: "16px" }}>No birds found.</p>
                    </div>
                )}

                {/* BIRD CARDS GRID */}
                {!loading && !error && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "24px"
                    }}>
                        {displayed.map(bird => (
                            <div key={bird._id}
                                style={{
                                    background: "#fff",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    border: "2px solid #f4a261",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "translateY(-6px)";
                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(244,162,97,0.25)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.07)";
                                }}
                            >
                                {/* IMAGE */}
                                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                                    <img
                                        src={bird.image || "https://via.placeholder.com/300x200?text=No+Image"}
                                        alt={bird.name}
                                        onError={e => e.target.src = "https://via.placeholder.com/300x200?text=No+Image"}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />

                                    <span style={{
                                        position: "absolute", top: "12px", right: "12px",
                                        background: bird.available ? "#28a745" : "#6c757d",
                                        color: "#fff", fontSize: "11px", fontWeight: "700",
                                        padding: "4px 10px", borderRadius: "20px"
                                    }}>
                                        {bird.available ? "🟢 Available" : "🔴 Adopted"}
                                    </span>
                                </div>

                                {/* INFO */}
                                <div style={{ padding: "18px 20px" }}>
                                    <h5 style={{ fontWeight: "bold", marginBottom: "6px", color: "#1a1a1a" }}>
                                        {bird.name}
                                    </h5>

                                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 4px 0" }}>
                                        🐦 {bird.breed}
                                    </p>

                                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 4px 0" }}>
                                        🎂 {bird.age} {bird.age === 1 ? "year" : "years"} old &nbsp;·&nbsp; ⚧ {bird.gender}
                                    </p>

                                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 12px 0" }}>
                                        📍 {bird.city}
                                    </p>

                                    {/* BADGES */}
                                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                                        {bird.vaccinated && (
                                            <span style={{ background: "#d4edda", color: "#155724", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                                                ✅ Vaccinated
                                            </span>
                                        )}
                                        {bird.neutered && (
                                            <span style={{ background: "#d1ecf1", color: "#0c5460", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                                                ✅ Neutered
                                            </span>
                                        )}
                                    </div>

                                    {/* VIEW DETAILS */}
                                    <button
                                        onClick={() => navigate(`/birds/${bird._id}`)}
                                        style={{
                                            width: "100%",
                                            background: "#f4a261", color: "#fff",
                                            border: "none", borderRadius: "12px",
                                            padding: "10px", fontWeight: "700",
                                            fontSize: "14px", cursor: "pointer",
                                            transition: "background 0.2s"
                                        }}
                                        onMouseEnter={e => e.target.style.background = "#e8894a"}
                                        onMouseLeave={e => e.target.style.background = "#f4a261"}
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>

{/* DYNAMIC BIRD DETAILS */}

{displayed.map((bird) => (

<Row className="justify-content-center mt-5" key={bird._id}>

    <div
        className="card justify-content-center border-warning p-4"
        style={{
            width: "60rem",
            borderRadius: "15px",
            border: "4px solid #f4a261",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
        }}
    >

        {/* IMAGE + INFO */}
        <div className="d-flex align-items-center gap-4 flex-wrap">

            <img
                src={bird.image}
                alt={bird.name}
                style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    border: "4px solid #f4a261",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                }}
            />

            <div>

                <h3>{bird.name}</h3>
                <br />

                <h5>Breed : {bird.breed}</h5>

                <h5>Age : {bird.age} yrs</h5>

                <h5>Location : {bird.city}</h5>

                <h5>
                    Status :
                    {" "}
                    {bird.available ? "Available" : "Adopted"}
                </h5>

            </div>

        </div>

        {/* MAP */}
        <div className="mt-4">

            <h5>Your perfect companion is waiting !!</h5>

            <iframe
                src={`https://maps.google.com/maps?q=${bird.latitude},${bird.longitude}&output=embed`}
                width="100%"
                height="450"
                style={{
                    borderRadius: "15px",
                    border: "4px solid #f4a261",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                }}
            ></iframe>

            <h6 className="mt-3">
                Latitude : {bird.latitude}
            </h6>

            <h6>
                Longitude : {bird.longitude}
            </h6>

        </div>

    </div>

</Row>
))}

<br/><br/><br/>

            {/* FOOTER */}
            <div style={{ backgroundColor: "#ffffff", borderTop: "2px solid #f4a261", padding: "40px 20px" }}>
                <Container>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px" }}>
                        <div style={{ maxWidth: "280px" }}>
                            <h4 style={{ color: "#f4a261" }}>PETMATCH</h4>
                            <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.7" }}>
                                PetMatch helps connect loving families with pets searching for safe and caring homes.
                            </p>
                            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                                {["bi-instagram","bi-facebook","bi-twitter-x","bi-youtube"].map((icon, i) => (
                                    <i key={i} className={`bi ${icon}`} style={{ fontSize: "20px", cursor: "pointer" }}></i>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>Quick Links</h6>
                            {[["Home","/home"],["About Us","/about"],["Contact Us","/contact"]].map(([l,p]) => (
                                <p key={p} style={{ cursor: "pointer" }} onClick={() => navigate(p)}>{l}</p>
                            ))}
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>Support</h6>
                            <p>Help Center</p><p>Privacy Policy</p><p>Terms & Conditions</p>
                        </div>
                        <div>
                            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>Contact</h6>
                            <p>Muscat, Oman</p><p>petmatch@gmail.com</p><p>+968 9999 9999</p>
                        </div>
                    </div>
                    <div style={{ borderTop: "1px solid #ddd", marginTop: "30px", paddingTop: "15px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <p style={{ margin: 0, color: "#777", fontSize: "13px" }}>© 2026 PETMATCH. All rights reserved.</p>
                        <p onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            style={{ margin: 0, cursor: "pointer", color: "#f4a261", fontWeight: "bold" }}>
                            Back to top ↑
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
}
