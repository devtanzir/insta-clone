import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useToggler from "../../../hooks/useToggler";
import { useState } from "react";
import Swal from "sweetalert2";
import { deletePost } from "../../../store/features/postApiSlice";

const usePost = () => {
  const dispatch = useDispatch();
  const { post: posts } = useSelector((state) => state.post);
  const { handleToggle, open } = useToggler();
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
  return {
    posts,
    open,
    openEdit,
    handleDeleteButton,
    handleDelete,
    handleEdit,
    handleToggle,
    handleToggleEdit,
    postId,
  };
};

export default usePost;
