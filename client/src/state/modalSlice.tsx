import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ModalState } from "@/types/ComponentType";
import type { Appointment } from "@/types/BookingType";

const initialState: ModalState = {
    isOpen: false,
    appointment: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openAppointmentModal: (state, action: PayloadAction<Appointment>) => {
            state.isOpen = true;
            state.appointment = action.payload;
        },
        closeAppointmentModal: (state) => {
            state.isOpen = false;
            state.appointment = null;
        }
    }
});

export const { openAppointmentModal, closeAppointmentModal } = modalSlice.actions;
export default modalSlice.reducer;

