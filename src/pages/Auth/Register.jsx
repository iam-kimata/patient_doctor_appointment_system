import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        gender: "",
        location: "",
        age: "",
        department: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="d-flex">
            <div className="container py-5">
                <div className="card register-card">
                    <h2 className="text-center mb-4 fw-bold">Register</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select name="role" id="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="" disabled>Select Role</option>
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="full_name" className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    name="full_name" 
                                    id="full_name" 
                                    className="form-control" 
                                    placeholder="Enter Full Name"
                                    value={formData.full_name}
                                    onChange={handleChange}  
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phone_number" 
                                    id="phone_number" 
                                    className="form-control" 
                                    placeholder="Enter Phone Number"
                                    value={formData.phone_number}
                                    onChange={handleChange}  
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    className="form-control" 
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}  
                                />
                            </div>

                            {(role === "" || role === "Patient") && (
                                <>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select name="gender" id="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input 
                                            type="text" 
                                            name="location" 
                                            id="location" 
                                            className="form-control" 
                                            placeholder="Enter Location"
                                            value={formData.location}
                                            onChange={handleChange}  
                                        />
                                    </div>
                                </>
                            )}

                            {(role === "" || role === "Doctor") && (
                                <>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input 
                                            type="text" 
                                            name="age" 
                                            id="age" 
                                            className="form-control" 
                                            placeholder="Enter Age"
                                            value={formData.age}
                                            onChange={handleChange}  
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="department" className="form-label">Department</label>
                                        <input 
                                            type="text" 
                                            name="department" 
                                            id="department" 
                                            className="form-control" 
                                            placeholder="Enter Department"
                                            value={formData.department}
                                            onChange={handleChange}  
                                        />
                                    </div>
                                </>
                            )}

                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
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
                            <div className="col-md-6 mb-3">
                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="confirm_password" 
                                    id="confirm_password" 
                                    className="form-control" 
                                    placeholder="Enter Confirm Password"
                                    value={formData.confirm_password}
                                    onChange={handleChange} 
                                />
                            </div>

                            <button type="submit" className="btn btn-success w-100">Submit</button>

                            <p className="text-center mt-2">
                                Already have an account?{" "}
                                <Link to="/" className="text-decoration-none">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );                 
};

export default Register;