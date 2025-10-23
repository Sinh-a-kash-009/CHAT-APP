import { SignupForm } from "./form";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { todoitem_fetch } from "../redux/apistore"
import { addTracker,deleteTracker } from "../redux/store";
import { useRef,useEffect,useCallback } from "react";



function TrackerComponents() {
  const dispatch = useDispatch();
  const itemRef = useRef({});
  
  const handleSubmit = async (e) => {

    e.preventDefault(); // prevent default form reload

    const itemValue = e.target.item.value;
    const date = e.target.date.value;

    console.log('Submitting item:', itemValue, date);

    if (!itemValue.trim() && !date) {
      console.error('Item and date cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/tracker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: itemValue, date }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server response:', data.task, data.date);
      
      // Clear the form after successful submission
      e.target.item.value = '';
      e.target.date.value = '';

      // Add the new item to Redux store immediately
      dispatch(addTracker({ task: data.task, date: data.date }));
      fetchTodoItems();
      
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit item. Please try again.');
    }
  };
  
  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchTodoItems = useCallback(async () => {
    try {
      const todoitem = await todoitem_fetch();
      console.log("data in todo item", todoitem);
      
      if (todoitem && Array.isArray(todoitem)) {
        // Clear existing items first to prevent duplicates
        dispatch(deleteTracker());
        
        // Add new items
        todoitem.forEach((item) => {
          dispatch(addTracker({ task: item.task, date: item.date }));
        });
      }
    } catch (error) {
      console.error("Error fetching todo items:", error);
    }
  }, []);
  useEffect(()=>{
    const fetchData=async()=>{
      const todoitem=await todoitem_fetch();
      console.log("data in todo item",todoitem);
      dispatch(deleteTracker());
        // Add new items
        todoitem.forEach((item) => {
          dispatch(addTracker({ task: item.task, date: item.date }));
        });
    }
    fetchData();
  },[]);




  return <form onSubmit={handleSubmit} style={{ position: 'relative', top: '64px' }}>
    <div className="mb-3 trackerclass">
      <input type="text" className="form-control" id="exampleInputEmail1" name="item" placeholder="Enter the item " />
      <input type='date' className="form-control" name='date' />
      <button type="submit" className="btn btn-success"><IoIosAddCircle /></button>
    </div>
  </form>
}
export default TrackerComponents;