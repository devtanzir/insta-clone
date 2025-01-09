import { Menu, PlusSquare } from "lucide-react";
import Button from "../../../components/ui/button";
import { menuItems } from "../constants/menu-item";
import ProfilePhoto from "../../../assets/images/tanzir.png";
import Modal from "../../../components/shared/modal";
import useToggler from "../../../hooks/useToggler";
import Threads from "../../../assets/icons/threads";

const MenuItem = () => {
  const { open, handleToggle } = useToggler();

  return (
    <nav className="flex flex-col h-full justify-between">
      {/* Top Section */}
      <div className="flex flex-col flex-1">
        {menuItems.map((item) => (
          <Button key={item.id}>
            {item.icon}
            <span className="ml-4">{item.label}</span>
          </Button>
        ))}

        <Button onClick={handleToggle}>
          <PlusSquare className="w-6 h-6" />
          <span className="ml-4">Create</span>
        </Button>
        <Button>
          <img
            src={ProfilePhoto}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover bg-white"
          />
          <span className="ml-4">Profile</span>
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col mt-auto pt-6">
        <Button>
          <Threads />
          <span className="ml-4">Threads</span>
        </Button>
        <Button>
          <Menu className="w-6 h-6" />
          <span className="ml-4">More</span>
        </Button>
      </div>

      <Modal open={open} handleToggle={handleToggle} />
    </nav>
  );
};

export default MenuItem;
