import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

export default function DogList() {
    const navigate = useNavigate();
    const [dogs, setDogs]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState("");
    const [search, setSearch]   = useState("");
    const [filter, setFilter]   = useState("all"); // all | available | adopted

    // ── Fetch dogs from MongoDB ───────────────────────────────
    useEffect(() => {
        fetch("http://localhost:5000/api/dogs")
            .then(res => res.json())
            .then(data => {
                setDogs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setError("Could not load dogs. Make sure the server is running.");
                setLoading(false);
            });
    }, []);

    // ── Filter + Search ───────────────────────────────────────
    const displayed = dogs.filter(dog => {
        const matchSearch =
            dog.name?.toLowerCase().includes(search.toLowerCase()) ||
            dog.breed?.toLowerCase().includes(search.toLowerCase()) ||
            dog.city?.toLowerCase().includes(search.toLowerCase());

        const matchFilter =
            filter === "all" ? true :
            filter === "available" ? dog.available :
            !dog.available;

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
                    <h2 style={{ fontWeight: "bold", color: "#1a1a1a" }}>🐶 Dogs for Adoption</h2>
                    <p style={{ color: "#666", fontSize: "15px" }}>
                        Find your perfect canine companion from our available dogs.
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
                        <div style={{ fontSize: "50px" }}>🐶</div>
                        <p style={{ color: "#f4a261", fontWeight: "600", marginTop: "12px" }}>
                            Loading dogs...
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
                        <div style={{ fontSize: "60px" }}>🐶</div>
                        <p style={{ marginTop: "12px", fontSize: "16px" }}>No dogs found.</p>
                    </div>
                )}

                {/* DOG CARDS GRID */}
                {!loading && !error && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "24px"
                    }}>
                        {displayed.map(dog => (
                            <div key={dog._id}
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
                                        src={dog.image || "https://via.placeholder.com/300x200?text=No+Image"}
                                        alt={dog.name}
                                        onError={e => e.target.src = "https://via.placeholder.com/300x200?text=No+Image"}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <span style={{
                                        position: "absolute", top: "12px", right: "12px",
                                        background: dog.available ? "#28a745" : "#6c757d",
                                        color: "#fff", fontSize: "11px", fontWeight: "700",
                                        padding: "4px 10px", borderRadius: "20px"
                                    }}>
                                        {dog.available ? "🟢 Available" : "🔴 Adopted"}
                                    </span>
                                </div>

                                {/* INFO */}
                                <div style={{ padding: "18px 20px" }}>
                                    <h5 style={{ fontWeight: "bold", marginBottom: "6px", color: "#1a1a1a" }}>
                                        {dog.name}
                                    </h5>

                                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 4px 0" }}>
                                        🐶 {dog.breed}
                                    </p>

                                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 4px 0" }}>
                                        🎂 {dog.age} {dog.age === 1 ? "year" : "years"} old &nbsp;·&nbsp; ⚧ {dog.gender}
                                    </p>

                                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 12px 0" }}>
                                        📍 {dog.city}
                                    </p>

                                    {/* BADGES */}
                                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                                        {dog.vaccinated && (
                                            <span style={{ background: "#d4edda", color: "#155724", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                                                ✅ Vaccinated
                                            </span>
                                        )}
                                        {dog.neutered && (
                                            <span style={{ background: "#d1ecf1", color: "#0c5460", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                                                ✅ Neutered
                                            </span>
                                        )}
                                    </div>

                                    {/* VIEW DETAILS */}
                                    <button
                                        onClick={() => navigate(`/dogs/${dog._id}`)}
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
        </div>
    );
}
