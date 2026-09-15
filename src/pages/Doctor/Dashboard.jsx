import { useState } from "react";
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
    
            const res = await api.get("dashboardInformation", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setUsers(res.data);
    
        } catch(error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleAdd = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        const res = await api.post(
            "store",
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
            patient: "",
            doctor: "",
            appointment_date: "",
            appointment_time: "",
        });

        setShowModal(false);

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
                                            <td>{appointment?.doctor}</td>
                                            <td>{appointment?.patient}</td>
                                            <td>{appointment?.appointment_date}</td>
                                            <td>{appointment?.appointment_time}</td>
                                            <td 
                                                className={
                                                    appointment.status === "Scheduled"
                                                    ? "text-success"
                                                    : "text-warning"
                                                }
                                            >
                                                {appointment?.status}
                                            </td>
                                            <td>
                                                <button className="btn btn-warning text-light btn-sm">Cancel</button>
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