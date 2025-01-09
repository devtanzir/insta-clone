import { suggestions } from "../constants/suggestions";
import Avatar from "../../../assets/images/tanzir.png";
import { footerBottomLinks, footerTopLinks } from "../constants/footer-links";
import { Fragment } from "react";

const RightSidebar = () => {
  return (
    <>
      <div className="hidden lg:block flex-1 p-8 max-w-[440px]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={Avatar}
              alt="tanziribneali"
              className="size-12 object-cover rounded-full bg-white"
            />
            <div>
              <p className="font-semibold">tanziribneali</p>
              <p className="text-gray-500">Tanzir IbneAli</p>
            </div>
          </div>
          <button className="text-blue-500 font-semibold">Switch</button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-semibold">
              Suggested for you
            </span>
            <button className="text-white text-sm font-semibold">
              See All
            </button>
          </div>

          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={suggestion?.image}
                    alt={suggestion.username}
                    className="size-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center">
                      <p className="font-semibold text-sm">
                        {suggestion.username}
                      </p>
                      {suggestion.verified && (
                        <svg
                          className="w-4 h-4 ml-1 text-blue-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">
                      {suggestion.subtitle}
                    </p>
                  </div>
                </div>
                <button className="text-blue-500 text-xs font-semibold">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <div className="space-x-1">
            {footerTopLinks.map((item, index) => (
              <Fragment key={item.id}>
                <span className="hover:underline cursor-pointer">
                  {item.name}
                </span>
                {index < footerTopLinks.length - 1 && <span>•</span>}
              </Fragment>
            ))}
          </div>
          <div className="mt-4 space-x-1">
            {footerBottomLinks.map((item, index) => (
              <Fragment key={item.id}>
                <span className="hover:underline cursor-pointer">
                  {item.name}
                </span>
                {index < footerBottomLinks.length - 1 && <span>•</span>}
              </Fragment>
            ))}
          </div>
          <p className="mt-4">© 2025 INSTAGRAM FROM META</p>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
