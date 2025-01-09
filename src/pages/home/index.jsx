import { MessageCircle, Menu } from "lucide-react";
import MenuItem from "./components/menu-item";
import Logo from "../../assets/icons/logo";
import Post from "./components/post";
import RightSidebar from "./components/right-sidebar";
import MobileNav from "./components/mobile-nav";
import { useState } from "react";

const InstagramClone = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen bg-black text-white">
        {/* Mobile Sidebar */}
        <MobileNav open={sidebarOpen} setOpen={setSidebarOpen} />
        {/* Desktop Sidebar */}
        <div className="hidden h-full lg:flex flex-col w-64 border-r border-gray-800 p-4 fixed">
          <Logo className="mb-8" />
          <MenuItem />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row lg:ml-[258px] ">
          <div className="lg:w-[630px]">
            {/* Mobile Header */}
            <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-800">
              <button onClick={() => setSidebarOpen(true)}>
                <Menu className="size-6" />
              </button>
              <Logo />
              <MessageCircle className="size-6" />
            </div>
            <Post />
          </div>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </>
  );
};
export default InstagramClone;
