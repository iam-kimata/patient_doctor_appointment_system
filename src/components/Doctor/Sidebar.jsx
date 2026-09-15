import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Sidebar = () => {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "logout", 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.removeItem("token");

            Navigate("/");

        } catch (error) {
            console.log(error?.response.data || error.message);
        }
    };

    return (
        <>
            <div className="bg-dark text-light position-fixed p-3 sidebar">
                <div className="d-flex fw-bold mb-4 fs-3">
                    <i className="bi bi-emoji-smile me-2"></i>DoctorHub
                </div>

                <ul className="nav flex-column">
                    <li className="nav-item mb-4">
                        <Link to="/dashboard" className="nav-link text-light">
                            <i className="bi bi-speedometer me-2"></i>
                            Dashboard
                        </Link>
                    </li>
                </ul>
                
                <div className="mt-5 text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                </div>
            </div>
        </>
    );
};

export default Sidebar;