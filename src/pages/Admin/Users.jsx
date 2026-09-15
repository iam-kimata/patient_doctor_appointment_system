import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import api from "../../api/axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(res.data);

        } catch(error) {
            console.log(error.response?.data || error.message);
        }
    };

    const [form, setForm] = useState({
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
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [showModal, setShowModal] = useState(false);

    const handleAdd = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        const res = await api.post(
            "createUser",
            form,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // refresh list
        fetchDashboard();

        setForm({
            full_name: "",
            email: "",
            gender: "",
            location: "",
            age: "",
            department: "",
            password: "",
            confirm_password: "",
        });

        setShowModal(false);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            <div className="container py-5 page-content">
                <div className="card">
                    <div className="card-header bg-dark text-light fs-5">Users
                        <button className="btn btn-light m-2 p-1" onClick={() => setShowModal(true)}>
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Location</th>
                                        <th>Age</th>
                                        <th>Department</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user?.fullName}</td>
                                            <td>{user?.email}</td>
                                            <td>{user?.gender ?? "NULL"}</td>
                                            <td>{user?.location ?? "NULL"}</td>
                                            <td>{user?.age ?? "NULL"}</td>
                                            <td>{user?.department ?? "NULL"}</td>
                                            <td>{user?.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* modal */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-light">
                                    <h4 className="modal-title text-center fs-4 w-100">Register Users</h4>
                                    <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body p-4">
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
                                                    onchange={handleChange}  
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
                                                    onchange={handleChange}  
                                                />
                                            </div>

                                            {(role === "" || role === "Patient") && (
                                                <>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="gender" className="form-label">Gender</label>
                                                        <input 
                                                            type="text" 
                                                            name="gender" 
                                                            id="gender" 
                                                            className="form-control" 
                                                            placeholder="Enter Gender"
                                                            value={formData.gender}
                                                            onchange={handleChange}  
                                                        />
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
                                                            onchange={handleChange}  
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
                                                            onchange={handleChange}  
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
                                                            onchange={handleChange}  
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
                                                    onchange={handleChange}  
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
                                                    onchange={handleChange} 
                                                />
                                            </div>

                                            <button type="submit" className="btn btn-success w-100">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;