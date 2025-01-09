import PropTypes from "prop-types";

const Button = ({ children, className, onClick }) => {
  return (
    <>
      <button
        className={`w-full flex items-center p-3 rounded-md hover:bg-zinc-800 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
