import React, { useEffect } from "react";
import "./FavoriteEventPage.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchEvents } from "../../redux/features/events/EventsSlice";

function FavoriteEventsPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(FetchEvents());
  }, []);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="favorite-events-page">
      <h2>Favorite Events</h2>
      <div className="favorite-events-list">
        {Array.isArray(events.events) && events.events.length > 0 ? (
          events.events.map((event, index) => (
            <div className="favorite-event-card" key={index}>
              <img src={event.image} alt={event.name} className="event-image" />
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>{event.category}</p>
                <p>{event.date.slice(0, 10)}</p>
                <p>{event.place}</p>
              </div>
              <button className="remove-button">Remove</button>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default FavoriteEventsPage;