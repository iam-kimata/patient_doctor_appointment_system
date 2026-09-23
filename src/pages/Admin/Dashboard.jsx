import { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import api from "../../api/axios";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [appointments, setAppointments] = useState([])

    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStats({
                patients: res.data.totalPatients,
                doctors: res.data.totalDoctors,
                appointments: res.data.totalAppointments,
            });

            setAppointments(res.data.data);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const [formData, setFormData] = useState({
        patient: "",
        doctor: "",
        appointment_date: "",
        appointment_time: "",
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    const fetchDropdownData = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("create", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPatients(res.data.patients);
            setDoctors(res.data.doctors);

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    fetchDropdownData();
    }, []);

    const handleAdd = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        const res = await api.post(
            "store",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchDashboard();

        setFormData({
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

        await fetchDashboard();

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await fetchDashboard();

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };
    
    return (
        <div>
            {/* sidebar */}
            <Sidebar />
            
            <div className="container py-5 page-content">
                <div className="row text-center text-light mb-5">
                    <div className="col">
                        <div className="card p-4 bg-success">
                            <i className="bi bi-people-fill fs-1"></i>
                            <h3>{stats.patients || 0}</h3>
                            <p>Total Patients</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-4 bg-primary">
                            <i className="bi bi-people-fill fs-1"></i>
                            <h3>{stats.doctors || 0}</h3>
                            <p>Total Doctors</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-4 bg-warning">
                            <i className="bi bi-calendar-date-fill fs-1"></i>
                            <h3>{stats.appointments || 0}</h3>
                            <p>Total Appointments</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header bg-dark text-light fs-5">Appointments
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
                                        <th>Patient Name</th>
                                        <th>Doctor Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={appointment.id}>
                                            <td>{index + 1}</td>
                                            <td>{appointment.patient?.full_name}</td>
                                            <td>{appointment.doctor?.full_name}</td>
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
                                            <td>
                                                <button 
                                                    className="btn btn-danger text-light btn-sm"
                                                    onClick={() => handleDelete(appointment.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
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
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-light">
                                    <h5 className="modal-title text-center fs-4 w-100">Create Appointment</h5>
                                    <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body p-4">
                                    <form onSubmit={handleAdd}>
                                        <div className="mb-3">
                                            <label htmlFor="patient" className="form-label">Patient Name</label>
                                            <select name="patient" id="patient" className="form-select" value={formData.patient} onChange={handleChange}>
                                                <option value="" disabled>Select Patient</option>

                                                {patients.map((patient) => (
                                                    <option key={patient.id} value={patient.id}>
                                                        {patient.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="doctor" className="form-label">Doctor Name</label>
                                            <select name="doctor" id="doctor" className="form-select" value={formData.doctor} onChange={handleChange}>
                                                <option value="" disabled>Select Doctor</option>

                                                {doctors.map((doctor) => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="appointment_date" className="form-label">Date</label>
                                            <input 
                                                type="date" 
                                                name="appointment_date" 
                                                id="appointment_date" 
                                                className="form-control"
                                                value={formData.appointment_date}
                                                onChange={handleChange} 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="appointment_time" className="form-label">Time</label>
                                            <input 
                                                type="time" 
                                                name="appointment_time" 
                                                id="appointment_time" 
                                                className="form-control"
                                                value={formData.appointment_time}
                                                onChange={handleChange} 
                                            />
                                        </div>

                                        <button type="submit" class="btn btn-success w-100">Submit</button>
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

export default Dashboard;