import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import "./EventList.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchEvents } from "../../redux/features/events/EventsSlice";
import { getCategories } from "../../redux/features/categories/categorySlice";


function MainPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const [sortByDate, setSortByDate] = useState("");
  const [sortByCategory, setSortByCategory] = useState("");

  const handleSortByDate = (event) => {
    setSortByDate(event.target.value);
  };

  const handleSortByCategory = (event) => {
    setSortByCategory(event.target.value);
  };

  useEffect(() => {
    dispatch(FetchEvents());
  }, []);

  const { categories } = useSelector(
    (state) => state.categories
)

  useEffect(() => {

    dispatch(getCategories())

}, [])

  return (
    <div>
      <div className="sort-bar">
        <label>Sort by:</label>
        <select className="categorySelect" onChange={handleSortByCategory}>
          <option value="">--Category--</option>
          {categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
        </select>
        <label className="sortText">And/Or</label>
        <select className="dateSelect" onChange={handleSortByDate}>
          <option value="">--Date--</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
          <option value="thisYear">This Year</option>
        </select>
      </div>

      <div className="event-cards">
        {Array.isArray(events.events) && events.events.length > 0 ? (
          events.events
            .filter((event) =>  {
              const eventDate = new Date(event.date);
              const today = new Date();
              let filtered = true;

              // Date filtering
              if (sortByDate === "today") {
                filtered = filtered && eventDate.toDateString() === today.toDateString();
              } else if (sortByDate === "tomorrow") {
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);
                filtered =
                  filtered && eventDate.toDateString() === tomorrow.toDateString();
              } else if (sortByDate === "thisWeek") {
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                filtered =
                  filtered &&
                  ((eventDate >= today && eventDate <= nextWeek) ||
                    eventDate.toDateString() === today.toDateString());
              } else if (sortByDate === "thisMonth") {
                const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                filtered =
                  filtered &&
                  ((eventDate >= today && eventDate <= nextMonth) ||
                    eventDate.toDateString() === today.toDateString());
              } else if (sortByDate === "thisYear") {
                const currentYear = today.getFullYear();
                const nextYear = new Date(currentYear + 1, 0, 1);
                filtered =
                  filtered &&
                  ((eventDate >= today && eventDate < nextYear) ||
                    eventDate.toDateString() === today.toDateString());
              }

              // Category filtering
              if (sortByCategory !== "" && event.category !== sortByCategory) {
                filtered = false;
              }

              return filtered;
            })
            .filter((event) => event.approved).map((event, index) => <EventCard key={index} event={event} />)
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;