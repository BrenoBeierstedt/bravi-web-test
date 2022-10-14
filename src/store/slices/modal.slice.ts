import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

export interface ModalState {
  id?: string;
  open: boolean;
  type?: string;
}

const initialState: ModalState = {
  open: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (_state, type) => {
      const state = _state;
      state.open = !state.open;
      state.type = type.payload.type;
      state.id = type.payload.id;
    },
  },
});

export const { openModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export const modaltype = (state: RootState) => state.modal.type;

export default modalSlice.reducer;
