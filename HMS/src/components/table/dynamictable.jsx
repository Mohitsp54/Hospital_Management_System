import React, { useState, useEffect, useRef } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";

const DynamicTable = ({
  columns,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white shadow rounded-lg overflow-hidden">
      {/* Table Container - Scrollable */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-4 text-gray-600 font-semibold"
                >
                  {col.label}
                </th>
              ))}
              <th scope="col" className="px-6 py-4 text-gray-600 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-6 py-4 text-gray-700">
                      {/* Handle dates or nested properties if needed */}
                      {col.type === "date" && row[col.name]
                        ? new Date(row[col.name]).toLocaleDateString()
                        : row[col.name]}
                    </td>
                  ))}
                  {/* Action Column */}
                  <td className="px-6 py-4 text-gray-700 relative">
                    <button
                      onClick={(e) => toggleMenu(row._id, e)}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {openMenuId === row._id && (
                      <div
                        ref={menuRef}
                        className="absolute right-10 top-2 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-20 flex flex-col"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(row);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 text-left hover:bg-gray-100 text-gray-700 flex items-center gap-2"
                        >
                          <FaRegEdit />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(row._id);
                            setOpenMenuId(null);
                          }}
                          className="px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                          <MdDelete />
                          Delete
                        </button>
                        <button className="px-4 py-2 text-left hover:bg-gray-100 text-gray-700 flex items-center gap-2">
                          <MdAssignmentAdd />
                          Assign Doc
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-2 flex justify-between items-center text-sm text-gray-600">
        {/* Left Side: Rows per page */}
        <div className="flex items-center gap-2">
          <span>Rows:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="border border-gray-300 rounded p-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
          >
            {[10, 20, 30, 50].map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>

        {/* Right Side: Page Info & Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium mr-2">
            Page {currentPage} of {totalPages || 1}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="First Page"
            >
              <MdKeyboardDoubleArrowLeft size={18} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <MdKeyboardArrowLeft size={18} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <MdKeyboardArrowRight size={18} />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Last Page"
            >
              <MdKeyboardDoubleArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
