import React, { useState, useEffect } from "react";
import "./EventCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEvents,
  deleteEvent,
  updateEvent,
} from "../../redux/features/events/EventsSlice";
import { getCategories } from "../../redux/features/categories/categorySlice";

function EventCard({ event }) {
  const { id, title, category, date, place, image } = event;
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(0);
  const [showDeleteUpdateButton, setShowDeleteUpdateButton] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);

  const dispatch = useDispatch();

  const [editEvent, setEditEvent] = useState({
    title: event.title,
    category: event.category,
    place: event.place,
    date: event.date.slice(0, 10),
    image: event.image,
    _id: event._id,
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setCount(count + 1);
  };
  const { user } = useSelector((state) => state.auth);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());

  }, [dispatch]);

  const handleChange = (e) => {
    setEditEvent({ ...editEvent, category: e.target.value });
  };



  useEffect(() => {
    if (user === null) {
    } else if (user.role === "admin") {
      setShowDeleteUpdateButton(true);
    } else if (user._id === event.user) {
      setShowDeleteUpdateButton(true);
    }
  }, [user]);

  const handleDeleteEvent = async () => {
    await dispatch(deleteEvent(event._id));
    dispatch(FetchEvents());
  };

  const updateEvent = () => {
    setShowUpdateInput(true);
    console.log(`Updating event with ID ${id}`);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setShowUpdateInput(false);
 

    console.log(editEvent);
    dispatch(updateEvent(editEvent));
  };

  return (
    <div className="event-card">
      <img className="event-image" src={image} alt={title} />
      <div className="event-details">
        {showUpdateInput ? (
          <>
            <form className="EventForm" onSubmit={handleUpdateSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={editEvent.title}
                  onChange={(e) => {
                    setEditEvent({
                      ...editEvent,
                      title: e.target.value,
                    });
                  }}
                  required
                />
              </label>
              <br />
              <label>
                Category:
                <select onChange={handleChange} className="custom">
                  <option value="">{editEvent.category}</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                Date:
                <input
                  type="date"
                  value={editEvent.date}
                  onChange={(e) => {
                    setEditEvent({
                      ...editEvent,
                      date: e.target.value,
                    });
                  }}
                  required
                />
              </label>
              <br />
              <label>
                Place:
                <input
                  type="text"
                  value={editEvent.place}
                  onChange={(e) => {
                    setEditEvent({
                      ...editEvent,
                      place: e.target.value,
                    });
                  }}
                  required
                />
              </label>
              <br />
              <label>
                Image URL:
                <input
                  type="text"
                  value={editEvent.image}
                  onChange={(e) => {
                    setEditEvent({
                      ...editEvent,
                      image: e.target.value,
                    });
                  }}
                  required
                />
              </label>
              <br />
              <button className="submitBtn" type="submit">
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className="event-name">
              {title}
              <div className="favorite">
                <FontAwesomeIcon
                  icon={isFavorite ? solidHeart : regularHeart}
                  className="favorite-icon"
                  onClick={toggleFavorite}
                />
                <p>{count}</p>
              </div>
            </h3>
            <p className="event-category">{category}</p>
            <p className="event-time">{date.slice(0, 10)}</p>
            <p className="event-place">{place}</p>
            <div className="action-buttons">
              {showDeleteUpdateButton && (
                <>
                  <button className="delete-button" onClick={handleDeleteEvent}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="action-icon"
                    />
                  </button>
                  <button className="update-button" onClick={updateEvent}>
                    <FontAwesomeIcon icon={faEdit} className="action-icon" />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventCard;
