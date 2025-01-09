import PropTypes from "prop-types";
const Label = ({ name, label }) => {
  return (
    <>
      <label className="block font-medium" htmlFor={name}>
        {label}
      </label>
    </>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Label;
