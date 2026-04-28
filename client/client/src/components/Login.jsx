import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import myLogo from "../images/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            setError("You must register first");
            return;
        }

        if (email !== savedUser.email || password !== savedUser.password) {
            setError("Invalid email or password");
            return;
        }

        setError("");
        navigate("/home");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">

            <div
                className="bg-light p-4 rounded-3 shadow"
                style={{
                    width: "350px",
                    border: "2px solid #f4a261"
                }}
            >

                <div className="text-center mb-3">
                    <img src={myLogo} style={{ width: "120px" }} />
                </div>

                <h3 className="text-center mb-3" style={{ color: "#f4a261" }}>
                    Login
                </h3>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                <Button
                    onClick={handleLogin}
                    className="w-100 mb-2"
                    style={{
                        backgroundColor: "#f4a261",
                        border: "none"
                    }}
                >
                    Login
                </Button>

                <Link to="/register" style={{ textDecoration: "none" }}>
                    <Button
                        className="w-100"
                        style={{
                            backgroundColor: "#f4a261",
                            border: "none"
                        }}
                    >
                        Register
                    </Button>
                </Link>

            </div>
        </Container>
    );
}