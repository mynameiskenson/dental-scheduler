import axios from "@/lib/axios";
import type { Dentist, Slot, Appointment, BookAppointmentDTO } from "@/types/BookingType";

export const getDentists = async (): Promise<Dentist[]> => {
    try {
        const response = await axios.get("/dentists");
        return response.data;
    } catch (error) {
        console.error("Error fetching dentists:", error);
        throw error;
    }
}

export const getDentistSlots = async (id: string, date: string): Promise<Slot[]> => {
    try {
        const response = await axios.get(`/dentists/${id}/slots`, {
            params: { date }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching dentist with ID ${id}:`, error);
        throw error;
    }
}

export const bookAppointment = async (appointmentData: BookAppointmentDTO): Promise<Appointment> => {
    try {
        const response = await axios.post("/appointments", appointmentData);
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw error;
    }
}