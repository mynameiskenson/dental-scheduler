import { useEffect, useState } from "react";
import { getUserAppointments, cancellAppointment } from "@/services/appointmentService";
import type { Appointment } from "@/types/BookingType";
import { useSelector, useDispatch } from "react-redux";
import RescheduleModal from "@/components/RescheduleModal";
import { closeAppointmentModal, openAppointmentModal } from "@/state/modalSlice";
import type { RootState } from "@/state/store";

const Dashboard = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Mobile view pagination
    const [mobilePage, setMobilePage] = useState(1)
    const mobileItemsPerPage = 2;

    const mobileTotalPages = Math.ceil(appointments.length / mobileItemsPerPage);
    const mobileLastIndex = mobilePage * mobileItemsPerPage;
    const mobileFirstIndex = mobileLastIndex - mobileItemsPerPage;
    const mobileAppointments = appointments.slice(mobileFirstIndex, mobileLastIndex);

    // Desktop view pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6

    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppointment = appointments.slice(indexOfFirstItem, indexOfLastItem)

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

    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user]);

    const handleCancelAppointment = async (appointmentId: number) => {
        try {
            setLoading(true);
            await cancellAppointment(appointmentId);
            setAppointments(prev => prev.filter(app => Number(app.id) !== appointmentId));
            fetchAppointments();
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRescheduleSuccess = () => {
        fetchAppointments();
        dispatch(closeAppointmentModal());
    }

    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <div className="p-6 rounded-2xl shadow-lg border border-white/30 w-full max-w-3xl bg-white/1 backdrop-blur-md">
                <h2 className="text-3xl mb-6 font-semibold text-white text-center">
                    My Appointments
                </h2>

                {appointments.length === 0 ? (
                    <p className="text-white/70 text-center">You have no appointments.</p>
                ) : (
                    <>
                        {/* Mobile view: stacked cards */}
                        <div className="sm:hidden space-y-4">
                            {mobileAppointments.map((appt) => {
                                const isCancelled = appt.status.toLowerCase() === "cancelled";
                                return (
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
                                                onClick={() => dispatch(openAppointmentModal(appt))}
                                                disabled={isCancelled}
                                                hidden={isCancelled}
                                                className="bg-blue-500 hover:bg-blue-600 tex-white px-4 py-1.5 rounded-xl text-sm"
                                            >
                                                Reschedule
                                            </button>
                                            <button
                                                onClick={() => handleCancelAppointment(Number(appt.id))}
                                                disabled={isCancelled}
                                                hidden={isCancelled}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="sm:hidden mt-4 flex justify-center gap-2 text-white">
                                {Array.from({ length: mobileTotalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setMobilePage(i + 1)}
                                        className={`px-3 py-1 rounded-md border ${mobilePage === i + 1
                                            ? "bg-blue-500 border-blue-600 text-white"
                                            : "bg-white/10 border-white/20 hover:bg-white/20"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
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
                                    {currentAppointment.map((appt) => {
                                        const isCancelled = appt.status.toLowerCase() === "cancelled";
                                        return (
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
                                                        onClick={() => dispatch(openAppointmentModal(appt))}
                                                        disabled={isCancelled || loading}
                                                        hidden={isCancelled}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-xl text-sm"
                                                    >
                                                        Reschedule
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelAppointment(Number(appt.id))}
                                                        disabled={isCancelled || loading}
                                                        hidden={isCancelled}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-sm"
                                                    >
                                                        {loading ? "Cancelling..." : "Cancel"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="mt-4 flex justify-center items-center gap-2 text-white">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded-md border ${currentPage === i + 1
                                            ? "bg-blue-500 border-blue-600 text-white"
                                            : "bg-white/10 border-white/20 hover:bg-white/20"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Reschedule modal rendered conditionally via Redux state */}
            <RescheduleModal onSuccess={handleRescheduleSuccess} />

        </div>
    );
}

export default Dashboard;