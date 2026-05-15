import Golden from "../images/Golden.png";
import French from "../images/French.png";
import Germen from "../images/Germen.png";
import FrenchDog from "../dogs/FrenchDog"
import GermenDog from "../dogs/GermenDog";
import GoldenDog from "../dogs/GoldenDog";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

export default function DogList(){

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
        <h3 className="text-center ">Find Your Paw-fect Companion</h3>
        <div className="d-flex justify-content-center mt-5 gap-4">
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Golden} className="card-img-top" alt="Golden"/>
            <div className="card-body">
                <h5 className="card-title">Golden Retriever Dog</h5>
                <h7 className="card-text">Age: 5 yrs </h7> <br/>
                <h7 className="card-text">Location: Pethouse Al-Mouj</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/GoldenDog")}>View Details</a>
            </div>
        </div>
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={French} className="card-img-top" alt="French"/>
            <div className="card-body">
                <h5 className="card-title">French Bull-Dog</h5>
                <h7 className="card-text">Age: 4 yrs </h7> <br/>
                <h7 className="card-text">Location: PetZoo Petshop & Veterinary Clinic</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/FrenchDog")}>View Details</a>
            </div>
        </div>
        <div className="card border-warning" style={{ width : "18rem" }}>
            <img src={Germen} className="card-img-top" alt="Germen"/>
            <div className="card-body">
                <h5 className="card-title">German Shepherd Dog</h5>
                <h7 className="card-text">Age: 7 yrs </h7> <br/>
                <h7 className="card-text">Location: Petland Al-Khuwair</h7> <br/><br/>
                <a href="#" className="btn btn-warning" onClick={() => navigate("/GermenDog")}>View Details</a>
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