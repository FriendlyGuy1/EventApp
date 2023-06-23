import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventsService from "./EventsService";

const initialState = {
  error: "",
  loading: false,
  events: [],
};

// Fetch Events
export const FetchEvents = createAsyncThunk(
  "events/FetchEvents",
  async (thunkAPI) => {
    try {
      return await eventsService.getEvents();
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create event
export const createEvent = createAsyncThunk(
    'events/create',
    async (eventData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await eventsService.createEvent(eventData, token)
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  )

// Get user events
export const getUserEvents = createAsyncThunk(
    'events/userEvents',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        const userId = thunkAPI.getState().auth.user._id
        return await eventsService.getUserEvents(token, userId)
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  )

// Delete user event
export const deleteEvent = createAsyncThunk(
    'events/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await eventsService.deleteEvent(id, token)
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  )
  
  
  // Update user event
  export const updateEvent = createAsyncThunk(
    "events/updateEvent",
    async (eventData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventsService.updateEvent(eventData, token);
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );


const eventsSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FetchEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = "";
    });
    builder.addCase(FetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.events = [];
    });
    builder.addCase(createEvent.pending, (state) => {
        state.loading = true
      })
      builder.addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = "";
      })
      builder.addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.events = [];
      })
      builder.addCase(getUserEvents.pending, (state) => {
        state.loading = true
      })
      builder.addCase(getUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = "";
      })
      builder.addCase(getUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.events = [];
      })
      builder.addCase(deleteEvent.pending, (state) => {
        state.loading = true
      })
      builder.addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = "";
      })
      builder.addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.events = [];
      })
      builder.addCase(updateEvent.pending, (state) => {
        state.loading = true
      })
      builder.addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = [...state.events.filter(event => event._id !== action.payload._id), action.payload]
        state.error = "";
      })
      builder.addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.events = [];
      })
  },
});

export default eventsSlice.reducer;