import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center bg-linear-to-r from-purple-500 to-blue-300 h-16 px-4">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Hospital Management System
          </h3>
        </div>
        <div className="h-10 w-90 bg-white rounded flex ">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full p-2 border-0 outline-none"
          />
          <button className="h-full w-10 bg-linear-to-r from-purple-500 to-blue-300 rounded-r p-2 text-white hover:from-purple-500 hover:to-blue-500">
            <IoIosSearch className="text-2xl" />
          </button>
        </div>
        <div>
          <ul className="flex gap-8">
            <li>
              <button
                onClick={onLogout}
                className="bg-linear-to-r from-purple-500 to-blue-500 hover:bg-none hover:bg-red-400  text-white font-semibold rounded h-10 w-20 "
              >
                Logout
              </button>
            </li>
            <li className="text-2xl font-semibold text-white flex items-center">
              {user ? user.name : "User"}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
