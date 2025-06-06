import axios from "@/lib/axios";
import type { Appointment, BookAppointmentDTO } from "@/types/BookingType";

export const getUserAppointments = async (userId: number): Promise<Appointment[]> => {
    try {
        const response = await axios.get(`/appointments/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user appointments:", error);
        throw error;
    }
}

export const cancellAppointment = async (appointmentId: number): Promise<void> => {
    try {
        await axios.patch(`/appointments/${appointmentId}`);
        return;
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        throw error;
    }
}

export const rescheduleAppointment = async (appointmentData: BookAppointmentDTO, appointmentId: number): Promise<void> => {
    try {
        await axios.patch(`/appointments/${appointmentId}/reschedule`, appointmentData)
        return;
    } catch (error) {
        console.error("Error rescheduling appointment:", error)
        throw error;
    }
}