
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAppointmentModal } from "@/state/modalSlice";
import type { AppDispatch, RootState } from "@/state/store";
import { getDentistSlots } from "@/services/bookService";
import { rescheduleAppointment } from "@/services/appointmentService";
import type { Slot } from "@/types/BookingType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type RescheduleModalProps = {
    onSuccess: () => void;
};

const RescheduleModal: React.FC<RescheduleModalProps> = ({ onSuccess }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen, appointment } = useSelector((state: RootState) => state.modal);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (appointment) {
            const apptDate = new Date(appointment.scheduledAt);
            setSelectedDate(apptDate);
            fetchSlots(apptDate);
        }
    }, [appointment]);

    const fetchSlots = async (date: Date) => {
        if (!appointment) return;
        try {
            const dateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
                .toISOString()
                .split("T")[0];
            const data = await getDentistSlots(String(appointment.dentistId), dateStr);
            setSlots(data);
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setSelectedSlot(null);
        if (date) fetchSlots(date);
    };

    const handleSubmit = async () => {
        if (!appointment || !selectedSlot) return;

        try {
            setLoading(true);
            await rescheduleAppointment({
                userId: appointment.userId,
                dentistId: appointment.dentistId,
                scheduledAt: selectedSlot!,
                reason: appointment.reason ?? undefined
            }, Number(appointment.id)
            );
            alert("Appointment rescheduled!");
            onSuccess?.();
            dispatch(closeAppointmentModal());
        } catch (err) {
            console.error("Reschedule failed:", err);
            alert("Failed to reschedule.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !appointment) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
            <div className="w-full sm:w-[400px] h-full p-6 overflow-y-auto shadow-xl rounded-lg bg-white/1 backdrop-blur-md border border-white/30">
                <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>

                <p className="mb-2 text-sm">
                    Dentist: <strong>{appointment.dentist?.fullName}</strong>
                </p>

                <p className="mb-4 text-sm">
                    Current Schedule:{" "}
                    <strong>
                        {new Date(appointment.scheduledAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </strong>
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Select New Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
                        dateFormat="yyyy-MM-dd"
                        className="w-full p-2 border rounded"
                        placeholderText="Pick a new date"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Select New Time</label>
                    {slots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {slots.map(
                                (slot) =>
                                    slot.available && (
                                        <button
                                            key={slot.datetime}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot.datetime)}
                                            className={`p-2 rounded border text-sm ${selectedSlot === slot.datetime
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 hover:bg-gray-200"
                                                }`}
                                        >
                                            {new Date(slot.datetime).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                                timeZone: "Asia/Singapore",
                                            })}
                                        </button>
                                    )
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No slots available for this date.</p>
                    )}
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-xl text-sm"
                        onClick={() => dispatch(closeAppointmentModal())}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-xl text-sm"
                        onClick={handleSubmit}
                        disabled={!selectedSlot || loading}
                    >
                        {loading ? "Rescheduling..." : "Confirm Reschedule"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RescheduleModal;