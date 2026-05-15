import { Col, Row } from "reactstrap";
import French from "../images/French.png";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function FrenchDog(){

    const [lat, setLat] = useState(23.644079155624414)
    const [lon, setLon] = useState(58.22085672699804)

    const navigate = useNavigate();

    return(
        <>
        <div style={{ 
                    background: "linear-gradient(to right, #f2f2f2, #ffe5d0)", 
                    minHeight: "100vh" 
                }}>
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
                        
                    </div>
        
                    <Row className="justify-content-center mt-5">
        
                        <div className="card border-warning p-4" 
                        style={{ 
                            width: "60rem",
                            borderRadius: "15px",
                            border: "4px solid #f4a261",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                         }}>
        
                            {/* IMAGE + INFO IN ONE ROW */}
                            <div className="d-flex align-items-center gap-4 flex-wrap">
        
                                {/* CAT IMAGE */}
                                <img 
                                    src={French} 
                                    alt="French"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        objectFit: "cover",
                                        borderRadius: "15px",
                                        border: "4px solid #f4a261",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                                    }}
                                />
        
                                {/* CAT INFO */}
                                <div>
                                    <h3>Coco</h3><br/>
                                    <h5>Breed : French Bulldog</h5>
                                    <h5>Age : 4 yrs</h5>
                                    <h5>Location : PetZoo Petshop & Veterinary Clinic</h5>
                                </div>
        
                            </div>
        
                            {/* LOCATION UNDER THEM */}
                            <div className="mt-4">
                                <h5>Your perfect companion is waiting !!</h5>
                                <iframe
                                    src={`https://maps.google.com/maps?q=${lat},${lon}&output=embed`}
                                    width="100%"
                                    height="450"
                                    style={{ borderRadius: "15px",
                                        border: "4px solid #f4a261",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                                     }}
                                ></iframe>
        
                                <h6 className="mt-3">Latitude : {lat}</h6>
                                <h6>Longitude : {lon}</h6>
                            </div>
                        </div>
                    </Row>
        
                    <div className="d-flex justify-content-center mt-4">
                <button
                className="btn w-100"
                style={{
                    backgroundColor: "#f4a261",
                    color: "white",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "18px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    maxWidth: "60rem",   // same width as card
                    transition: "0.3s"
                }}
                onClick={() => navigate("/DogList")}
                >
                ← Back to Previous Page
                </button>
                </div>
                </div>
                </>
            
    )
}