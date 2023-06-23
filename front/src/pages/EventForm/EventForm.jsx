import React, { useState, useEffect } from "react";
import "./EventForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/features/events/EventsSlice";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/features/categories/categorySlice";

function EventForm() {
  const [title, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "") {
      alert("category cant be empty!");
      return;
    }

    const newEvent = { title, category, date, place, image };
    dispatch(createEvent(newEvent));

    setName("");
    setCategory("");
    setDate("");
    setPlace("");
    setImage("");
  };

  return (
    <form className="EventForm" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={title}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Category:
        <select onChange={handleChange} className="custom">
          <option value="">--Choose a category--</option>
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Place:
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>
      <br />
      <button className="submitBtn" type="submit">
        Add Event
      </button>
    </form>
  );
}

export default EventForm;
