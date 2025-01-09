import { useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ label, name, setFile }) => {
  const [showName, setShowName] = useState({});
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setShowName(imageFile);
      setFile(e.target.files[0]);
    }
  };
  return (
    <div className="space-y-4 flex flex-col justify-center">
      <div>
        <label
          htmlFor={name}
          className="flex w-full max-w-[380px] md:w-[380px]"
        >
          <div className="w-fit whitespace-nowrap bg-amber-500 px-3 py-2 text-black font-normal">
            {label}
          </div>
          <div className="flex w-full max-w-[380px] items-center border-b-[2px] border-amber-500 px-2 font-medium text-gray-400">
            {showName.name ? showName.name : "No File Chosen"}
          </div>
        </label>
        <input
          onChange={handleChange}
          className="hidden"
          type="file"
          name={name}
          id={name}
        />
      </div>
    </div>
  );
};
FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  setFile: PropTypes.func,
};
export default FileUpload;
