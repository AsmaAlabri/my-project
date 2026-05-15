import Peacock from "../images/Peacock.png"
import Flamingo from "../images/Flamingo.png"
import Parrots from "../images/Parrots.png"
import FlamingoBird from "../birds/FlamingoBird";
import ParrotBird from "../birds/ParrotBird"
import PeacockBird from "../birds/PeacockBird"
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

export default function BirdList(){

    const navigate = useNavigate();

    return(
        <>
        <div style={{ background: "linear-gradient(to right, #f2f2f2, #ffe5d0)", minHeight: "100vh" }}>

            {/* NAVBAR */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderBottom: "2px solid #f4a261",
                    padding: "15px 30px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h4 style={{ color: "#f4a261", margin: 0 }}>
                    PETMATCH
                </h4>

                <div style={{ display: "flex", gap: "20px" }}>
                    <NavLink
                        to="/home"
                        style={{ color: "#f4a261", textDecoration: "none" }}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/about"
                        style={{ color: "#f4a261", textDecoration: "none" }}
                    >
                        About Us
                    </NavLink>

                    <NavLink
                        to="/contact"
                        style={{ color: "#f4a261", textDecoration: "none" }}
                    >
                        Contact Us
                    </NavLink>

                    <NavLink
                        to="/profile"
                        style={{ color: "#f4a261", textDecoration: "none" }}
                    >
                        Profile
                    </NavLink>
                </div>
            </div>

        <br/><br/>
        <h3 className="text-center ">Feathered Friends Waiting for a Home</h3>
        <div className="d-flex justify-content-center mt-5 gap-4">
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Peacock} className="card-img-top" alt="Peacock"/>
            <div className="card-body">
                <h5 className="card-title">Peacock Bird</h5>
                <h7 className="card-text">Age: 11 yrs </h7> <br/>
                <h7 className="card-text">Location: Safari World Ibra</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/PeacockBird")}>View Details</a>
            </div>
        </div>
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Flamingo} className="card-img-top" alt="Flamingo"/>
            <div className="card-body">
                <h5 className="card-title">Flamingo Bird</h5>
                <h7 className="card-text">Age: 12 yrs </h7> <br/>
                <h7 className="card-text">Location: Flamingo lake Qurayyat</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/FlamingoBird")}>View Details</a>
            </div>
        </div>
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Parrots} className="card-img-top" alt="Parrots"/>
            <div className="card-body">
                <h5 className="card-title">Parrot Bird</h5>
                <h7 className="card-text">Age: 20 yrs </h7> <br/>
                <h7 className="card-text">Location: Pet Palace Halban</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/ParrotBird")}>View Details</a>
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