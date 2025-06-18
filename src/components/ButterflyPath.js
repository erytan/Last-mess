import React, { useState, useEffect } from 'react';
import butterflys from "../images/background/buttefly-s.gif";
import "./css/ButterflyPath.css";
import { apiGetLetter } from "../apis/letter"

const ButterflyPath = () => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const fetchLetters = async () => {
        setLoading(true);
        try {
            const response = await apiGetLetter();
            const sortedLetters = [...(response.bodyLetter || [])].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setLetters(sortedLetters);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải danh sách thư');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLetters();
    }, []);


    const handleButterflyClick = () => {
        setShowPopup(true);
        
    };

    const closePopup = () => {
        setShowPopup(false);
    };
    

    return (
        <div style={{ position: "relative", width: "90vw", height: "100vh" }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 1500"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute", bottom: 0, left: 0, overflow: "visible" }}
            >
                <path
                    id="motionPath"
                    d="M 0 1400 C 150 200, 700 300, 950 1170"
                    fill="none"
                    stroke="transparent"
                />

                <image
                    href={butterflys}
                    width="100"
                    height="100"
                    onClick={handleButterflyClick}
                    style={{ cursor: "pointer" }} // Thêm con trỏ để báo hiệu có thể nhấn
                >
                    <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        dur="0.5s"
                        begin="2s"
                        fill="freeze"
                    />
                    <animateMotion
                        dur="6s"
                        begin="2s"
                        repeatCount="1"
                        fill="freeze"
                    >
                        <mpath href="#motionPath" />
                    </animateMotion>
                </image>
            </svg>

            {showPopup && (
                <div className="papper-letter"
                    style={{
                        position: "fixed",
                        transform: "translate(4%, 30%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                        width: "90%",
                    }}>
                    <div
                        className="paper-contanier"
                    >
                        <div className="paper-context">
                            <div className="letter-list-wrapper">
                                {letters.map(letter => (
                                    <div dangerouslySetInnerHTML={{ __html: letter.bodyLetter }} />
                                ))}
                            </div>
                            <button
                                onClick={closePopup}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButterflyPath;