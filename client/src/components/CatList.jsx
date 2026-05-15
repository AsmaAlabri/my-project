import Persian from "../images/Persian.png"
import Domestic from "../images/Domestic.png"
import Siamese from "../images/Siamese.png"
import PersianCat from "../cats/PersianCat";
import DomesticCat from "../cats/DomesticCat";
import SiameseCat from "../cats/SiameseCat";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";


export default function CatList(){

     const navigate = useNavigate();

    return(
        <>
        <div style={{ background: "linear-gradient(to right, #f2f2f2, #ffe5d0)", minHeight: "100vh" }}>


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

        <br/><br/>
        <h3 className="text-center ">Choose Your Purr-fect Pet</h3>
        <div className="d-flex justify-content-center mt-5 gap-4">
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Persian} className="card-img-top" alt="Persian"/>
            <div className="card-body">
                <h5 className="card-title">Persian Cat</h5>
                <h7 className="card-text">Age: 3 yrs </h7> <br/>
                <h7 className="card-text">Location: PetHouse Al-Qurum</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/PersianCat")}>View Details</a>
            </div>
        </div>
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Domestic} className="card-img-top" alt="Domestic"/>
            <div className="card-body">
                <h5 className="card-title">Domestic Shorthair Cat</h5>
                <h7 className="card-text">Age: 5 yrs </h7> <br/>
                <h7 className="card-text">Location : Animal World Al-Araimi Boulevard</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/DomesticCat")}>View Details</a>
            </div>
        </div>
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Siamese} className="card-img-top" alt="Siamese"/>
            <div className="card-body">
                <h5 className="card-title">Siamese Cat</h5>
                <h7 className="card-text">Age: 2 yrs </h7> <br/>
                <h7 className="card-text">Location: Animal World Al-Hail</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/SiameseCat")}>View Details</a>
            </div>
        </div>
        </div>

        {/* FOOTER */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderTop: "2px solid #f4a261",
                    padding: "40px 20px",
                    marginTop: "40px"
                }}
            >
                <Container>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: "30px"
                        }}
                    >

                        {/* LOGO + DESCRIPTION */}
                        <div style={{ maxWidth: "280px" }}>
                            <h4 style={{ color: "#f4a261" }}>
                                PETMATCH
                            </h4>

                            <p
                                style={{
                                    color: "#555",
                                    fontSize: "14px",
                                    lineHeight: "1.7"
                                }}
                            >
                                PetMatch helps connect loving families with
                                pets searching for safe and caring homes.
                                Discover, adopt, and create meaningful
                                companionship through a trusted and simple
                                adoption experience.
                            </p>

                            {/* SOCIAL MEDIA */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "15px",
                                    marginTop: "15px"
                                }}
                            >
                                <i
                                    className="bi bi-instagram"
                                    style={{
                                        fontSize: "20px",
                                        cursor: "pointer"
                                    }}
                                ></i>

                                <i
                                    className="bi bi-facebook"
                                    style={{
                                        fontSize: "20px",
                                        cursor: "pointer"
                                    }}
                                ></i>

                                <i
                                    className="bi bi-twitter-x"
                                    style={{
                                        fontSize: "20px",
                                        cursor: "pointer"
                                    }}
                                ></i>

                                <i
                                    className="bi bi-youtube"
                                    style={{
                                        fontSize: "20px",
                                        cursor: "pointer"
                                    }}
                                ></i>
                            </div>
                        </div>

                        {/* QUICK LINKS */}
                        <div>
                            <h6
                                style={{
                                    color: "#000",
                                    marginBottom: "15px",
                                    fontWeight: "bold"
                                }}
                            >
                                Quick Links
                            </h6>

                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/home")}
                            >
                                Home
                            </p>

                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/list")}
                            >
                                Pets
                            </p>

                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/about")}
                            >
                                About Us
                            </p>

                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/contact")}
                            >
                                Contact Us
                            </p>
                        </div>

                        {/* SUPPORT */}
                        <div>
                            <h6
                                style={{
                                    color: "#000",
                                    marginBottom: "15px",
                                    fontWeight: "bold"
                                }}
                            >
                                Support
                            </h6>

                            <p>Help Center</p>
                            <p>Privacy Policy</p>
                            <p>Terms & Conditions</p>
                            <p>Customer Support</p>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h6
                                style={{
                                    color: "#000",
                                    marginBottom: "15px",
                                    fontWeight: "bold"
                                }}
                            >
                                Contact
                            </h6>

                            <p>Muscat, Oman</p>
                            <p>petmatch@gmail.com</p>
                            <p>+968 9999 9999</p>
                        </div>

                    </div>

                    {/* FOOTER BOTTOM */}
                    <div
                        style={{
                            borderTop: "1px solid #ddd",
                            marginTop: "30px",
                            paddingTop: "15px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                color: "#777",
                                fontSize: "13px"
                            }}
                        >
                            © 2026 PETMATCH. All rights reserved.
                        </p>

                        <p
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }
                            style={{
                                margin: 0,
                                cursor: "pointer",
                                color: "#f4a261",
                                fontWeight: "bold"
                            }}
                        >
                            Back to top ↑
                        </p>
                    </div>

                </Container>
            </div>
            </div>
        </>
    )
}