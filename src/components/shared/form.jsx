import { useState } from "react";
import Input from "../ui/input";
import Label from "../ui/label";
import { cloudImageUpload } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/features/postApiSlice";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { activeLoading } from "../../store/features/postSlice";
import { Loader } from "lucide-react";

const Form = ({ handleToggle }) => {
  // Initial form state
  const initialState = {
    authorName: "",
    postDetails: "",
  };

  const { loading } = useSelector((state) => state.post);
  const [formData, setFormData] = useState({ ...initialState });
  const [avatar, setAvatar] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const dispatch = useDispatch();

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure Cloudinary environment variables are set
    if (
      !import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME ||
      !import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ) {
      Swal.fire({
        icon: "error",
        title: "Cloudinary Configuration Missing",
        text: "Please check your environment variables.",
      });
      return;
    }

    // Validate required fields
    if (!formData.authorName || !formData.postDetails) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Author name and post details are required.",
      });
      return;
    }

    dispatch(activeLoading());

    let avatarUrl = null;
    let postImageUrl = null;

    try {
      // Upload avatar image if selected
      if (avatar) {
        const avatarData = await cloudImageUpload({
          file: avatar,
          cloudName: import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME,
          preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        });
        avatarUrl = avatarData?.secure_url;
      }

      // Upload post image if selected
      if (postImage) {
        const postImageData = await cloudImageUpload({
          file: postImage,
          cloudName: import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME,
          preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        });
        postImageUrl = postImageData?.secure_url;
      }

      // Check if uploads were successful
      if (!avatarUrl || !postImageUrl) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Error",
          text: "Failed to upload images.",
        });
        return;
      }

      // Dispatch action to create a new post
      dispatch(
        createPost({
          ...formData,
          avatar: avatarUrl,
          postImage: postImageUrl,
          createdAt: Date.now(),
          updatedAt: null,
          like: 0,
        })
      );

      // Reset form and close modal
      setFormData({ ...initialState });
      handleToggle();
      Swal.fire({
        title: "Post Created!",
        icon: "success",
      });
      e.target.reset();
    } catch (error) {
      console.error("Error during submission:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "An error occurred while processing your request.",
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-zinc-900">
      <form className="w-full space-y-6 text-left" onSubmit={handleSubmit}>
        {/* Author Name Input */}
        <div className="space-y-2 text-sm text-zinc-400">
          <Label label="Author Name" name="authorName" />
          <Input
            type="text"
            name="authorName"
            placeholder="Author Name"
            onChange={handleChange}
            value={formData.authorName}
          />
        </div>

        {/* Avatar Upload */}
        <div className="space-y-2 text-sm text-zinc-400">
          <input
            type="file"
            name="authorPhoto"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {/* Post Details Textarea */}
        <div className="space-y-2 text-sm text-zinc-400">
          <Label label="Post Details" name="postDetails" />
          <textarea
            className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 border-zinc-700 bg-[#121212]"
            id="postDetails"
            placeholder="What's on your mind?"
            name="postDetails"
            onChange={handleChange}
            value={formData.postDetails}
          />
        </div>

        {/* Post Image Upload */}
        <div className="space-y-2 text-sm text-zinc-400">
          <input
            type="file"
            name="postImage"
            onChange={(e) => setPostImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="rounded-md px-4 py-2 w-full text-white transition-colors hover:bg-orange-600 bg-orange-700"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              Processing...
              <Loader className="size-6 animate-spin text-white" />
            </span>
          ) : (
            "Share"
          )}
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};

export default Form;
