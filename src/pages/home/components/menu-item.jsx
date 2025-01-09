import { Menu, MessageSquare } from "lucide-react";
import Button from "../../../components/ui/button";
import { menuItems } from "../constants/menu-item";
import ProfilePhoto from "../../../assets/images/tanzir.png";
import Modal from "../../../components/shared/modal";
import useToggler from "../../../hooks/useToggler";
import { PlusSquare } from "lucide-react";

const MenuItem = () => {
  const { open, handleToggle } = useToggler();

  return (
    <>
      <nav className="flex-1 space-y-1">
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
            className="size-6 rounded-full object-cover bg-white"
          />
          <span className="ml-4">Profile</span>
        </Button>
        <Button>
          <MessageSquare className="size-6" />
          <span className="ml-4">Threads</span>
        </Button>
        <Button>
          <Menu className="size-6" />
          <span className="ml-4">More</span>
        </Button>
        <Modal open={open} handleToggle={handleToggle} />
      </nav>
    </>
  );
};

export default MenuItem;
