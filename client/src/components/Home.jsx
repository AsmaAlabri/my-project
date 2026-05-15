import { Container } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

    const pets = [
        {
            name: "Cats",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131"
        },
        {
            name: "Dogs",
            img: "https://images.unsplash.com/photo-1517849845537-4d257902454a"
        },
        {
            name: "Birds",
            img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3"
        }
    ];

    // const goToList = (petName) => {
    //     navigate(`/list?category=${petName}`);
    // };

    const goToList = (petName) => {

    if (petName === "Cats") {
        navigate("/CatList");
    }

    else if (petName === "Dogs") {
        navigate("/DogList");
    }

    else if (petName === "Birds") {
        navigate("/BirdList");
    }};

    return (
        <div
            style={{
                background: "linear-gradient(to right, #f2f2f2, #ffe5d0)",
                minHeight: "100vh"
            }}
        >

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

            {/* HERO SECTION */}
            <Container
                className="d-flex flex-column justify-content-center"
                style={{
                    height: "40vh",
                    alignItems: "flex-start"
                }}
            >
                <h1
                    style={{
                        color: "#000",
                        fontWeight: "bold",
                        marginBottom: "20px"
                    }}
                >
                    Where love finds a home 🏠
                </h1>
            </Container>

            {/* PET CATEGORIES */}
            <Container
                style={{
                    backgroundColor: "#ffffff",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    marginBottom: "40px"
                }}
            >
                <h3
                    style={{
                        color: "#f4a261",
                        marginBottom: "20px"
                    }}
                >
                    Pet Categories
                </h3>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "40px"
                    }}
                >
                    {pets.map((pet, index) => (
                        <div
                            key={index}
                            onClick={() => goToList(pet.name)}
                            style={{
                                textAlign: "center",
                                cursor: "pointer"
                            }}
                        >
                            <img
                                src={pet.img}
                                alt={pet.name}
                                style={{
                                    width: "110px",
                                    height: "110px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "4px solid #f4a261"
                                }}
                            />

                            <p
                                style={{
                                    marginTop: "12px",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}
                            >
                                {pet.name}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* INFO SECTION */}
            <Container
                className="text-center"
                style={{
                    marginBottom: "60px"
                }}
            >
                <h3
                    style={{
                        fontWeight: "bold",
                        marginBottom: "15px",
                        color: "#000"
                    }}
                >
                    Your perfect companion is waiting
                </h3>

                <p
                    style={{
                        color: "#555",
                        maxWidth: "650px",
                        margin: "0 auto 20px auto",
                        fontSize: "14px",
                        lineHeight: "1.8"
                    }}
                >
                    PetMatch is a technology platform that connects homeless
                    animals with loving families. Using location-based services
                    and a seamless adoption process, we make it easier to find
                    your ideal companion and give pets the caring homes they
                    deserve.
                </p>
            </Container>

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
    );
}