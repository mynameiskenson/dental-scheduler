export interface Dentist {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    specialty: string;
}

export interface Slot {
    datetime: string; // ISO 8601 format
    available: boolean; // ISO 8601 format
}

export interface Appointment {
    id: string;
    userId: number;
    dentistId: number;
    scheduledAt: string; // ISO 8601 format
    reason?: string;
    status: 'scheduled' | 'cancelled' | 'completed';
    createdAt: string; // ISO 8601 format
}

export interface BookAppointmentDTO {
    userId: number;
    dentistId: number;
    scheduledAt: string; // ISO 8601 format
    reason?: string;
}