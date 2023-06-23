import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneApprovalEvent from "./OneEvent";
import { FetchEvents } from "../../redux/features/events/EventsSlice";

const EventApproval = () => {
  const dispatch = useDispatch();

  const { events} = useSelector(
    (state) => state.events
  );

  useEffect(() => {

    dispatch(FetchEvents());


  }, [dispatch]);

  return (
    <div>
      {events.filter((event) => !event.approved).length > 0 ? (
        <div className="goalsApproval">
          {events
            .filter((event) => !event.approved)
            .map((event) => (
              <OneApprovalEvent key={event._id} event={event} />
            ))}
        </div>
      ) : (
        <h2>No events that need Approval</h2>
      )}
    </div>
  );
};

export default EventApproval;