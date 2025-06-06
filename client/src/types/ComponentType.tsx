import type { Appointment } from "./BookingType";

export interface ModalState {
    isOpen: boolean;
    appointment: Appointment | null;
}