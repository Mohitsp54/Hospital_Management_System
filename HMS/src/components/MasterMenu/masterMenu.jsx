import { useState, useMemo } from "react";
import { masterMenuconfig } from "../../../config/masterMenuconfig";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const MasterMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { user, permissions } = useSelector((state) => state.auth);

  const filteredMenu = useMemo(() => {
    // If user is super admin or no permissions set (fallback), maybe show all?
    // User requested: "check for the permissions allowed ... show only those options"
    // So we follow strict filtering.
    // However, we should handle the case where legacy users have no permissions yet.
    // For now, assume strict list.

    // Helper to check if a path is permitted
    const isPermitted = (path) => permissions?.includes(path);

    return masterMenuconfig.reduce((acc, item) => {
      // Check children first
      const permittedChildren = item.Children?.filter((child) =>
        isPermitted(child.path),
      );

      // If item has children, show it if it has permitted children OR if the parent path itself is explicitly permitted
      // (Though usually parent path is just a toggle, but user checked parent checkbox to select "Patients")
      if (item.Children) {
        if (permittedChildren && permittedChildren.length > 0) {
          acc.push({ ...item, Children: permittedChildren });
        } else if (isPermitted(item.path)) {
          // Case where parent is selected but maybe no children? Or all children?
          // Based on our form logic, selecting parent selects children.
          // If we only have parent permission, maybe we verify what that means.
          // For now, if parent path is in permissions, we show it (maybe with all children?)
          // User's requirement: "permissions allowed to that doctor role show only those"
          // Let's rely on child permissions for submenus.
          // If parent is permitted but no children are filtered, it might be weird.
          // Let's assume if parent is permitted, it might imply some access.
          // But cleaner to just show parents that have accessible children.
          // Config Logic: Checkbox tree selects parent AND children. So we should represent what's in 'permissions'.

          // If parent is checked in DB, show it. If it has children in config, we might need to know which children.
          // If only parent path is in permissions, we might show parent with NO children?
          // Let's filter children based on permissions.
          if (permissions.includes(item.path)) {
            // If parent is allowed, we might want to check if any children are allowed.
            // If NO children are allowed, does it make sense to show parent?
            // Probably not for a collapsible menu.
            // So strict rule: Parent shows ONLY if it has > 0 allowed children (or if it's a direct link).
            // But wait, the checkbox tree logic we made: parent selects children.
            // So if parent is valid, children should be valid too.
          }
        }
      } else {
        // Direct link item
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
