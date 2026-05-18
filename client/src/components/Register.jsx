import { Container, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import myLogo from "../images/logo.png";
import { apiUrl } from "../api.js";

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

    const handleRegister = async () => {

    const { firstName, lastName, email, password } = form;

    if (!firstName || !lastName || !email || !password) {
        setError("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(apiUrl("/register"), {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(form)
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        setError("");

        navigate("/");

    } catch (error) {

        setError("Server error");
    }
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
                            <Label htmlFor="firstName">First Name</Label>
                            <Input name="firstName" type="text" id="firstName" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input name="lastName" type="text" id="lastName" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" id="email" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" type="password" id="password" onChange={handleChange} />
                        </FormGroup>

                        <Button
                            htmlFor="register"
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
                                htmlFor="login"
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