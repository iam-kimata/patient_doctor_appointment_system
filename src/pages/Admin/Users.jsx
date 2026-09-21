import { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import api from "../../api/axios";

const Users = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            <div className="container py-5 page-content">
                <div className="card">
                    <div className="card-header bg-dark text-light fs-5">Users</div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Full Name</th>
                                        <th>Phone Number</th>
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
                                            <td>{user?.full_name}</td>
                                            <td>{user?.phone_number}</td>
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
            </div>
        </div>
    );
};

export default Users;