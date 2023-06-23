import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { deleteCategory, getCategories, postCategory } from "../../redux/features/categories/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchEvents } from "../../redux/features/events/EventsSlice";
import OneApprovalEvent from "../../components/EventApproval/OneEvent";

function AdminPanel() {
  const [isUsersShown, setUsersIsShown] = useState(false);
  const [isEventsShown, setEventsIsShown] = useState(false);
  const [isCategoriesShown, setCategoriesIsShown] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const { events} = useSelector(
    (state) => state.events
  );

  useEffect(() => {

    dispatch(FetchEvents());


  }, [dispatch]);



  const handleCategoryBtn = () => {
    setCategoriesIsShown((current) => !current);
    setEventsIsShown(false);
    setUsersIsShown(false)
  };

  const handleEventsBtn = () => {
    setEventsIsShown((current) => !current);
    setCategoriesIsShown(false);
    setUsersIsShown(false)
  };

  // fetches categories
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);



  // creates a category

  const [category, setCategory] = useState("");

  const onSubmit = async(e) => {
    e.preventDefault();
    await dispatch(postCategory({ category }));
    dispatch(getCategories())
  };

  // deletes a category
  const deleteACategory = (id) => {
    console.log(id)
    dispatch(deleteCategory({id}))
    dispatch(getCategories())
}

  return (
    <>
      <div className="admin-panel">
        <h2>Admin Panel</h2>
        <div className="admin-actions">
          <button className="admin-button">Manage Users</button>
          <button className="admin-button" onClick={handleEventsBtn}>
            Manage Events
          </button>
          <button className="admin-button" onClick={handleCategoryBtn}>
            Manage Categories
          </button>
        </div>
      </div>
      {isCategoriesShown && (
        <div>
          <form onSubmit={onSubmit} className="adminForm">
            <input
              type="text"
              placeholder="Add category name"
              className="adminInput"
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit" className="adminSubmit admin-button">
              Submit
            </button>
          </form>
          {categories?.map((category) => (
                        <div key={category._id}>
                            <h2>{category.category}</h2>
                            <div>
                                <button onClick={() => deleteACategory(category._id)} className=" admin-button">remove</button>
                            </div>

                        </div>
                    ))}
        </div>
      )}

      {isEventsShown && 
      <div>
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
        
        </div>}
        
    </>
  );
}

export default AdminPanel;
