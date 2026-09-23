import { useState, useEffect } from "react";
import Sidebar from "../../components/Doctor/Sidebar";
import api from "../../api/axios";

const Dashboard = () => {
const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetchAppointments();
    }, []);
    
    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");
    
            const res = await api.get("dashboardInfo", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setAppointments(res.data.appointments);
    
        } catch(error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
        const token = localStorage.getItem("token");

        await api.put(
            `appointments/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        await fetchAppointments();

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="d-flex">
            {/* sidebar */}
            <Sidebar />

            <div className="container py-5 page-content">
                <div className="card">
                    <div className="card-header bg-dark text-light fs-5">Available Appointments</div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Doctor Name</th>
                                        <th>Patient Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={appointment.id}>
                                            <td>{index + 1}</td>
                                            <td>{appointment?.doctor?.full_name}</td>
                                            <td>{appointment?.patient?.full_name}</td>
                                            <td>{appointment?.appointment_date}</td>
                                            <td>{appointment?.appointment_time}</td>
                                            <td 
                                                className={
                                                    appointment.status === "scheduled"
                                                    ? "text-success"
                                                    : "text-warning"
                                                }
                                            >
                                                {appointment?.status}
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-warning text-light btn-sm"
                                                    onClick={() => handleCancel(appointment.id)}
                                                >
                                                    Cancel
                                                </button>
                                            </td>
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

export default Dashboard;