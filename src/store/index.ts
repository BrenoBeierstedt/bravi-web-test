import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/people.slice';
import modalReducer from './slices/modal.slice';
import contactReducer from './slices/contact.slice';

export const store = configureStore({
  reducer: {
    people: userReducer,
    modal: modalReducer,
    contact: contactReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
