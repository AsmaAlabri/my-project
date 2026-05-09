import { Container, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import myLogo from "../images/logo.png";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        const { firstName, lastName, email, password } = form;

        if (!firstName || !lastName || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        if (!email.includes("@")) {
            setError("Enter a valid email");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(form));

        setError("");

        navigate("/"); // 👈 go to LOGIN page
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{ backgroundColor: "#f2f2f2" }}
        >

            <Container
                className="p-4 shadow rounded-4"
                style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid #f4a261"
                }}
            >
                <Row>

                    <Col md="6" className="p-3">

                        <h5
                            className="mb-3"
                            style={{
                                color: "#f4a261",
                                fontWeight: "bold",
                                letterSpacing: "2px"
                            }}
                        >
                            PETMATCH
                        </h5>

                        <h3 className="mb-4" style={{ color: "#000" }}>
                            Registration
                        </h3>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <FormGroup>
                            <Label>First Name</Label>
                            <Input name="firstName" type="text" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input name="lastName" type="text" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Email</Label>
                            <Input name="email" type="email" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Password</Label>
                            <Input name="password" type="password" onChange={handleChange} />
                        </FormGroup>

                        <Button
                            onClick={handleRegister}
                            style={{
                                backgroundColor: "#f4a261",
                                border: "none",
                                width: "100%",
                                marginTop: "10px"
                            }}
                        >
                            Register
                        </Button>

                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button
                                style={{
                                    backgroundColor: "#f4a261",
                                    border: "none",
                                    width: "100%",
                                    marginTop: "10px"
                                }}
                            >
                                Login
                            </Button>
                        </Link>

                    </Col>

                    <Col
                        md="6"
                        className="d-flex justify-content-center align-items-center"
                    >
                        <img
                            src={myLogo}
                            alt="register"
                            style={{
                                width: "100%",
                                maxWidth: "450px",
                                height: "auto",
                                objectFit: "contain"
                            }}
                        />
                    </Col>

                </Row>
            </Container>
        </Container>
    );
}