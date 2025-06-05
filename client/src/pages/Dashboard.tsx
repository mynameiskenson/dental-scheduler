import { useEffect, useState } from "react";
import { getUserAppointments, cancellAppointment } from "@/services/appointmentService";
import type { Appointment } from "@/types/BookingType";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

const Dashboard = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (user) {
                try {
                    const data = await getUserAppointments(Number(user.id));
                    setAppointments(data);
                } catch (error) {
                    console.error("Failed to fetch appointments:", error);
                }
            }
        };
        fetchAppointments();
    }, [user]);

    const handleCancelAppointment = async (appointmentId: number) => {
        try {
            await cancellAppointment(appointmentId);
            setAppointments(prev => prev.filter(app => Number(app.id) !== appointmentId));
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <div className="p-6 rounded-2xl shadow-lg border border-white/30 w-full max-w-3xl bg-white/10 backdrop-blur-md">
                <h2 className="text-3xl mb-6 font-semibold text-white text-center">
                    My Appointments
                </h2>

                {appointments.length === 0 ? (
                    <p className="text-white/70 text-center">You have no appointments.</p>
                ) : (
                    <>
                        {/* Mobile view: stacked cards */}
                        <div className="sm:hidden space-y-4">
                            {appointments.map((appt) => (
                                <div
                                    key={appt.id}
                                    className="bg-white/10 border border-white/20 rounded-xl p-4 text-white shadow"
                                >
                                    <p><strong>Dentist:</strong> {appt.dentist?.fullName ?? "Unknown"}</p>
                                    <p><strong>Date:</strong> {new Date(appt.scheduledAt).toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                        timeZone: "Asia/Singapore",
                                    })}</p>
                                    <p><strong>Status:</strong> {appt.status}</p>
                                    <div className="mt-3">
                                        <button
                                            onClick={() => handleCancelAppointment(Number(appt.id))}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop/tablet view: table layout */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full table-auto border-collapse text-white text-sm">
                                <thead>
                                    <tr className="text-left border-b border-white/30">
                                        <th className="py-2 px-3">Dentist</th>
                                        <th className="py-2 px-3">Date</th>
                                        <th className="py-2 px-3">Status</th>
                                        <th className="py-2 px-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt) => (
                                        <tr
                                            key={appt.id}
                                            className="border-b border-white/20 hover:bg-white/5 transition"
                                        >
                                            <td className="py-3 px-3">{appt.dentist?.fullName ?? "Unknown Dentist"}</td>
                                            <td className="py-3 px-3">
                                                {new Date(appt.scheduledAt).toLocaleString("en-US", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                    timeZone: "Asia/Singapore",
                                                })}
                                            </td>
                                            <td className="py-3 px-3 capitalize">{appt.status}</td>
                                            <td className="py-3 px-3 text-center space-x-2">
                                                <button
                                                    onClick={() => handleCancelAppointment(Number(appt.id))}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;