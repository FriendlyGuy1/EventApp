import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/features/auth/authSlice'
import eventReducer from "../redux/features/events/EventsSlice"
import categoryReducer from '../redux/features/categories/categorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
     categories: categoryReducer,
  },
})