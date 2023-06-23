import axios from "axios";

const ROOT_URL = "api/events/";

// Get events

const getEvents = async () => {
  const response = await axios.get(ROOT_URL);
  return response.data;
};

// Get user events
const getUserEvents = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(ROOT_URL, config);

  let userEvents = [];

  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].user === userId) {
      userEvents.push(response.data[i]);
    }
  }
  return userEvents;
};

// Create event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(ROOT_URL, eventData, config);

  return response.data;
};

// Delete evennt
const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(ROOT_URL + eventId, config);
  console.log(response)
  return response.data;
};

// Update user event
const updateEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(ROOT_URL + eventData._id, eventData, config);

  return response.data;
};

const eventsService = {
  getEvents,
  createEvent,
  getUserEvents,
  updateEvent,
  deleteEvent
};

export default eventsService;