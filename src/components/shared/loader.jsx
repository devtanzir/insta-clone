import { Loader } from "lucide-react";
import PropTypes from "prop-types";

const LoaderSpinner = ({ isOn = false }) => {
  if (!isOn) return null;
  return (
    <div className=" z-50 absolute w-full h-full flex flex-col items-center justify-center bg-red-500">
      <Loader className="size-6 animate-spin text-white" />
    </div>
  );
};
LoaderSpinner.propTypes = {
  isOn: PropTypes.bool,
};
export default LoaderSpinner;
