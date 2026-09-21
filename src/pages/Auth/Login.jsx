import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await api.post("login", {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");

        } catch (err) {
            const status = err.response?.status;

            if (status === 422) {
                setErrors(err.response.data.errors || {});
                setErrorMessage("");
            } else if (status === 401) {
                setErrorMessage(err.response?.data?.message || "Invalid Username or Password");
                setErrors({});
            } else {
                setErrorMessage("Server error or Network issue");
                console.log(err);
            }
        }
    };

    return (
        <div className="d-flex">
            <div className="container py-5">
                <div className="card login-card">
                    <h2 className="text-center mb-4 fw-bold">Login</h2>

                    {errorMessage && (
                        <div className="alert alert-danger text-center py-2">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>

                            {errors.email?.[0] && (
                                <div className="text-danger small mb-1">
                                    {errors.email[0]}
                                </div>
                            )}

                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Enter Username" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>

                            {errors.password?.[0] && (
                                <div className="text-danger small mb-1">
                                    {errors.password[0]}
                                </div>
                            )}

                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100">Login</button>
                        
                        <p className="text-center mt-2">
                            I don't have an account?{" "}
                            <Link to="/register" className="text-decoration-none">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;