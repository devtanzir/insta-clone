import PropTypes from "prop-types";
const PostOptionsList = ({ handleDelete, handleEdit }) => {
  return (
    <>
      <div className="flex flex-col divide-y divide-gray-700 min-w-80">
        <button
          onClick={() => handleEdit()}
          className="rounded w-full py-3.5 text-white font-medium hover:bg-gray-700/50"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete()}
          className="rounded w-full py-3.5 text-red-500 font-medium hover:bg-gray-700/50"
        >
          Delete
        </button>
      </div>
    </>
  );
};
PostOptionsList.propTypes = {
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default PostOptionsList;
