// This code defines a Booking page where users can select a dentist, view available slots, and book an appointment.
import { useEffect, useState } from "react";
import { getDentists, getDentistSlots, bookAppointment } from "@/services/bookService";
import type { Dentist, Slot } from "@/types/BookingType";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Book = () => {
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const [selectedDentistId, setSelectedDentistId] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [reason, setReason] = useState<string>("");
    const user = useSelector((state: RootState) => state.auth.user);


    useEffect(() => {
        const fetchDentists = async () => {
            try {
                const data = await getDentists();
                setDentists(data);
            } catch (error) {
                console.error("Failed to fetch dentists:", error);
            }
        };
        fetchDentists();
    }, []);

    useEffect(() => {
        if (selectedDentistId && selectedDate) {
            const fetchSlots = async () => {
                try {
                    const utcDate = new Date(Date.UTC(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                    ));

                    const dateString = utcDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

                    const data = await getDentistSlots(selectedDentistId, dateString);
                    setSlots(data);
                } catch (error) {
                    console.error("Failed to fetch slots:", error);
                }
            };
            fetchSlots();
        } else {
            setSlots([]);
        }
    }, [selectedDentistId, selectedDate]);

    const handleBookAppointment = async (datetime: string) => {
        if (!user) {
            alert("You must be logged in to book an appointment.");
            return;
        }

        await bookAppointment({
            userId: Number(user.id),
            dentistId: Number(selectedDentistId),
            scheduledAt: datetime,
            reason: reason.trim() || undefined,
        });
        alert("Appointment booked successfully!");
        setSelectedDentistId("");
        setSelectedDate(new Date());
        setSlots([]);
        setReason("");
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (selectedSlot) handleBookAppointment(selectedSlot);
                }}
                className="p-6 rounded-2xl shadow-lg border border-white/30 w-full max-w-md bg-white/1 backdrop-blur-md"
            >
                <h2 className="text-3xl mb-6 font-semibold text-white text-center">
                    Book an Appointment
                </h2>

                {/* Dentist Select */}
                <div className="mb-4">
                    <select
                        className="w-full p-3 rounded-xl border border-white/30 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedDentistId}
                        onChange={(e) => setSelectedDentistId(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a Dentist</option>
                        {dentists.map((dentist) => (
                            <option key={dentist.id} value={dentist.id} className="text-black">
                                {dentist.fullName} - {dentist.specialty}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Picker */}
                <div className="mb-4">
                    <DatePicker
                        className="w-full p-3 rounded-xl border border-white/30 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        filterDate={(date) => {
                            const day = date.getDay();
                            return day !== 0 && day !== 6;
                        }}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                    />
                </div>

                {/* Reason for visit */}
                <div className="mb-4">
                    <textarea
                        className="w-full p-3 rounded-xl border border-white/30 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Reason for visit (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>

                {/* Slot Buttons */}
                {slots && slots.filter(slot => slot.available).length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {slots.map((slot) =>
                            slot.available ? (
                                <button
                                    type="button"
                                    key={slot.datetime}
                                    className={`p-2 rounded-xl text-white text-sm transition-colors ${selectedSlot === slot.datetime
                                        ? "bg-green-600"
                                        : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    onClick={() => setSelectedSlot(slot.datetime)}
                                >
                                    {new Date(slot.datetime).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                        timeZone: "Asia/Singapore",
                                    })}
                                </button>
                            ) : null
                        )}
                    </div>
                ) : (
                    <p className="text-white/70 italic text-center mb-4">
                        No available slots for the selected date.
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    disabled={!selectedSlot}
                >
                    Confirm Appointment
                </button>
            </form>
        </div>
    );
}

export default Book;