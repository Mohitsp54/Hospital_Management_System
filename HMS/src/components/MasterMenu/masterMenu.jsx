import { useState, useMemo } from "react";
import { masterMenuconfig } from "../../../config/masterMenuconfig";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const MasterMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { user, permissions } = useSelector((state) => state.auth);

  const filteredMenu = useMemo(() => {
    const isPermitted = (path) => permissions?.includes(path);

    return masterMenuconfig.reduce((acc, item) => {
      const permittedChildren = item.Children?.filter((child) =>
        isPermitted(child.path),
      );
      if (item.Children) {
        if (permittedChildren && permittedChildren.length > 0) {
          acc.push({ ...item, Children: permittedChildren });
        } else if (isPermitted(item.path)) {
          if (permissions.includes(item.path)) {
            if (permittedChildren && permittedChildren.length > 0) {
              acc.push({ ...item, Children: permittedChildren });
            }
          }
        }
      } else {
        if (isPermitted(item.path)) {
          acc.push(item);
        }
      }
      return acc;
    }, []);
  }, [permissions]);

  const toggleMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  return (
    <div className="h-screen w-64 border-r-2 border-gray-200 bg-linear-to-b from-purple-500 to-blue-300 text-white overflow-y-auto pb-20">
      <ul className="flex flex-col">
        {filteredMenu.map((item, index) => (
          <li key={index} className="flex flex-col border-b border-white/20">
            {item.Children ? (
              <div
                className={`flex justify-between items-center p-4 cursor-pointer hover:bg-white/20 transition-colors ${
                  activeMenu === item.name ? "bg-white/20" : ""
                }`}
                onClick={() => toggleMenu(item.name)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div>
                  {activeMenu === item.name ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
                  )}
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setActiveMenu(null)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{item.name}</span>
                </div>
              </Link>
            )}

            {/* Children Items */}
            {item.Children && activeMenu === item.name && (
              <ul className="bg-black/10">
                {item.Children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <Link
                      to={child.path}
                      className="block py-2 pl-12 pr-4 text-sm hover:text-white hover:bg-white/10 transition-colors text-gray-100"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MasterMenu;
