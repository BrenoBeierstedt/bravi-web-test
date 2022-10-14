import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import request, { ERequestStatus } from '../../common/request';

export interface PeopleProps {
  id?: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updateddAt?: string;
}

export interface IPeopleState {
  singularPeople?: PeopleProps;
  peoples: PeopleProps[];
  status: ERequestStatus;
}

const initialState: IPeopleState = {
  singularPeople: { firstName: '', lastName: '' } as PeopleProps,
  peoples: [],
  status: ERequestStatus.IDLE,
};

export const fetchPeoples = createAsyncThunk('people/fetchPeople', async () => {
  const response = await request.get<PeopleProps[]>('people');
  return response;
});

export const fetchSingularPeople = createAsyncThunk(
  'people/fetchSingularPeople',
  async (id: string) => {
    const response = await request.get<PeopleProps>(`people/${id}`);
    return response;
  },
);

export const deletePeople = createAsyncThunk(
  'people/deletePeople',
  async (id: string | undefined) => {
    const response = await request.delete<PeopleProps>(`people/${id}`);
    return response;
  },
);

export const updatePeople = createAsyncThunk('people/updatePeople', async (people: PeopleProps) => {
  const { id, ...info } = people;
  const response = await request.put<string, PeopleProps>(`people/${id}`, JSON.stringify(info));
  return response;
});

export const addPeople = createAsyncThunk('people/addPeople', async (people: PeopleProps) => {
  const { id, ...info } = people;
  const response = await request.post<string, PeopleProps>(`people`, JSON.stringify(info));
  return response;
});

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSingularPeople: (_state, action) => {
      const state = _state;
      state.singularPeople = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingularPeople.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchSingularPeople.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.singularPeople = action.payload;
      })
      .addCase(fetchSingularPeople.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(fetchPeoples.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchPeoples.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.peoples = action.payload;
      })
      .addCase(fetchPeoples.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(deletePeople.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(deletePeople.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.peoples = state.peoples.filter((u) => u.id !== action.meta.arg);
      })
      .addCase(deletePeople.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(updatePeople.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(updatePeople.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.singularPeople = action.payload;
        state.peoples = state.peoples.map((u) =>
          u.id !== action.meta.arg.id ? u : { ...u, ...action.meta.arg },
        );
      })
      .addCase(updatePeople.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(addPeople.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(addPeople.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.peoples = [...state.peoples, action.payload];
      })
      .addCase(addPeople.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      });
  },
});
export const { setSingularPeople } = peopleSlice.actions;

export const selectSingularPeople = (state: RootState) => state.people.singularPeople;
export const selectPeoples = (state: RootState) => state.people.peoples;
export const selectStatus = (state: RootState) => state.people.status;

export default peopleSlice.reducer;
