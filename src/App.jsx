import { useEffect } from "react";
import "./App.css";
import Instagram from "./pages/home";
import { useDispatch } from "react-redux";
import { getAllPosts } from "./store/features/postApiSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <>
      <Instagram />
    </>
  );
}

export default App;
