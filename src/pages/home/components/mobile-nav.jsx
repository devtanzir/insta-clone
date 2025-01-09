import PropTypes from "prop-types";
import { X } from "lucide-react";

import Logo from "../../../assets/icons/logo";
import { menuItems } from "../constants/menu-item";

const MobileNav = ({ open, setOpen }) => {
  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          open
            ? "translate-x-0 opacity-100 visible transition duration-300 ease-in-out"
            : "-translate-x-80 opacity-0 invisible transition duration-150 ease-in-out"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setOpen(false)}
        ></div>
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-black p-4 h-screen overflow-y-scroll">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4"
          >
            <X className="w-6 h-6" />
          </button>
          <Logo className="mb-8" />
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="flex items-center space-x-4 w-full p-2 hover:bg-zinc-800 rounded-md"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

MobileNav.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default MobileNav;
