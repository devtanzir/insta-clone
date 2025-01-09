import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useToggler from "../../../hooks/useToggler";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  deletePost,
  likeIncrement,
} from "../../../store/features/postApiSlice";

const usePost = () => {
  const dispatch = useDispatch();
  const { post: posts } = useSelector((state) => state.post);
  const { handleToggle, open } = useToggler();
  const [showHeart, setShowHeart] = useState({});
  const { handleToggle: handleToggleEdit, open: openEdit } = useToggler();
  const [postId, setPostId] = useState();
  const handleDeleteButton = (id) => {
    setPostId(id);
    handleToggle();
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to Delete This Post?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deletePost(postId));
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Post is not Deleted", "", "info");
      }
    });

    handleToggle();
  };
  const handleEdit = () => {
    handleToggleEdit();
    handleToggle();
  };
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, like: post.like + 1 }; // Create a new object with updated likes
      }
      return post; // Return the post as is if it doesn't match
    });

    const newPost = updatedPosts.find((post) => post.id === id);
    dispatch(likeIncrement(newPost));
    setShowHeart((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShowHeart((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  return {
    posts,
    open,
    openEdit,
    handleDeleteButton,
    handleDelete,
    handleEdit,
    handleToggle,
    handleToggleEdit,
    handleLike,
    postId,
    showHeart,
  };
};

export default usePost;
