import { IoMdPersonAdd } from "react-icons/io";
import { RiExportFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
const subHeader = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center bg-linear-to-r from-purple-500 to-blue-300 h-12 px-4">
      <h1 className="text-2xl font-semibold text-white">Patients</h1>
      <div className="h-8 w-90 bg-white rounded flex ">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full p-2 border-0 outline-none"
        />
        <button className="h-full w-10 bg-linear-to-r from-purple-500 to-blue-300 rounded-r p-2 text-white hover:from-purple-500 hover:to-blue-500">
          <IoIosSearch className="text-xl text-white font-bold" />
        </button>
      </div>
      <ul className="flex gap-8">
        <li>
          <button
            className="flex gap-1 items-center hover:bg-white/20 p-2 rounded transition-all"
            onClick={onAddClick}
          >
            <IoMdPersonAdd />
            Add
          </button>
        </li>
        <li>
          <button className="flex gap-1 items-center hover:bg-white/20 p-2 rounded transition-all">
            <RiExportFill />
            Export
          </button>
        </li>
      </ul>
    </div>
  );
};
export default subHeader;
