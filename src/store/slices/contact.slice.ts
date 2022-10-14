import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import request, { ERequestStatus } from '../../common/request';

export interface ContactProps {
  id?: string;
  type: string;
  info: string;
  peopleId?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IContactState {
  singularContact?: ContactProps;
  contacts: ContactProps[];
  status: ERequestStatus;
}

const initialState: IContactState = {
  singularContact: { type: '', info: '' } as ContactProps,
  contacts: [],
  status: ERequestStatus.IDLE,
};

export const fetchContact = createAsyncThunk('contact/fetchContact', async (id: string) => {
  const response = await request.get<ContactProps[]>(`contact/${id}`);
  return response;
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async (id: string) => {
  const response = await request.delete<ContactProps>(`contact/${id}`);
  return response;
});

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async (contact: ContactProps) => {
    const { id, ...info } = contact;
    const response = await request.put<string, ContactProps>(`contact/${id}`, JSON.stringify(info));
    return response;
  },
);

export const addContact = createAsyncThunk('contact/addContact', async (contact: ContactProps) => {
  const { id, ...info } = contact;
  const response = await request.post<string, ContactProps>(`contact`, JSON.stringify(info));
  return response;
});

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setSingularContact: (_state, action) => {
      const state = _state;
      state.singularContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchContact.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.contacts = action.payload;
      })
      .addCase(fetchContact.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(deleteContact.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(deleteContact.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.contacts = state.contacts.filter((u) => u.id !== action.meta.arg);
      })
      .addCase(deleteContact.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(updateContact.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(updateContact.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.contacts = state.contacts.map((u) =>
          u.id !== action.meta.arg.id ? u : { ...u, ...action.meta.arg },
        );
      })
      .addCase(updateContact.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(addContact.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(addContact.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContact.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      });
  },
});

export const selectSingularContact = (state: RootState) => state.people.singularPeople;
export const selectContacts = (state: RootState) => state.contact.contacts;
export const selectStatus = (state: RootState) => state.contact.status;

export default contactSlice.reducer;
