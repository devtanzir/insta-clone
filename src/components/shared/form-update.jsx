// Required imports
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";

import Input from "../ui/input";
import Label from "../ui/label";
import { cloudImageUpload } from "../../utils/utils";
import { updatePost } from "../../store/features/postApiSlice";
import { activeLoading } from "../../store/features/postSlice";

const UpdateForm = ({ handleToggle, formValue }) => {
  // Redux hooks for state management
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.post);

  // Local state for form data and file uploads
  const [formData, setFormData] = useState({ ...formValue });
  const [avatar, setAvatar] = useState(null);
  const [postImage, setPostImage] = useState(null);

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate environment variables for Cloudinary configuration
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

    // Initialize default URLs for avatar and post image
    let avatarUrl = formValue?.avatar || null;
    let postImageUrl = formValue?.postImage || null;

    try {
      // Upload avatar if a new file is selected
      if (avatar) {
        const avatarData = await cloudImageUpload({
          file: avatar,
          cloudName: import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME,
          preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        });
        avatarUrl = avatarData?.secure_url;
      }

      // Upload post image if a new file is selected
      if (postImage) {
        const postImageData = await cloudImageUpload({
          file: postImage,
          cloudName: import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME,
          preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        });
        postImageUrl = postImageData?.secure_url;
      }

      // Check if the uploads succeeded
      if (!avatarUrl || !postImageUrl) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Error",
          text: "Failed to upload images.",
        });
        return;
      }

      // Dispatch the update post action
      dispatch(
        updatePost({
          id: formValue.id,
          ...formData,
          avatar: avatarUrl,
          postImage: postImageUrl,
          createdAt: formValue.createdAt,
          updatedAt: Date.now(),
        })
      );

      // Reset the form and close the modal
      setFormData({ ...formValue });
      handleToggle();
      Swal.fire({
        title: "Post Updated!",
        icon: "success",
      });

      e.target.reset(); // Clear the file input fields
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
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {/* Display existing avatar */}
        {formValue?.avatar && (
          <div className="flex items-center justify-between">
            <img
              className="w-12 h-12 rounded object-cover"
              src={formValue.avatar}
              alt="Author"
            />
          </div>
        )}

        {/* Post Details Textarea */}
        <div className="space-y-2 text-sm text-zinc-400">
          <Label label="Post Details" name="postDetails" />
          <textarea
            className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 border-zinc-700 bg-[#121212]"
            id="postDetails"
            placeholder="What's in your mind"
            name="postDetails"
            onChange={handleChange}
            value={formData.postDetails}
          />
        </div>

        {/* Post Image Upload */}
        <div className="space-y-2 text-sm text-zinc-400">
          <input
            type="file"
            name="postImages"
            onChange={(e) => setPostImage(e.target.files[0])}
          />
        </div>

        {/* Display existing post image */}
        {formValue?.postImage && (
          <div className="flex items-center justify-between">
            <img
              className="w-12 h-12 rounded object-cover"
              src={formValue.postImage}
              alt="Post"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={loading}
          className="rounded-md px-4 py-2 w-full text-white transition-colors hover:bg-orange-600 bg-orange-700"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              Updating...
              <Loader className="size-6 animate-spin text-white" />
            </span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

// Define prop types for the component
UpdateForm.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  formValue: PropTypes.object.isRequired,
};

export default UpdateForm;
