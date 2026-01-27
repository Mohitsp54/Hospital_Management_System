import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const PermissionTree = ({ options, selected, onChange }) => {
  const handleCheck = (path, children) => {
    let newSelected = [...selected];
    const isSelected = newSelected.includes(path);

    // Toggle current path
    if (isSelected) {
      newSelected = newSelected.filter((p) => p !== path);
      // Deselect all children
      const removeChildren = (items) => {
        items?.forEach((child) => {
          newSelected = newSelected.filter((p) => p !== child.path);
          if (child.Children) removeChildren(child.Children);
        });
      };
      if (children) removeChildren(children);
    } else {
      newSelected.push(path);
      // Select all children
      const addChildren = (items) => {
        items?.forEach((child) => {
          if (!newSelected.includes(child.path)) newSelected.push(child.path);
          if (child.Children) addChildren(child.Children);
        });
      };
      if (children) addChildren(children);
    }

    // Handle "Child selects Parent" logic bottom-up
    // We need to re-evaluate the entire tree to ensure parents are selected if any child is selected.

    // Create a map or helper to find parents. Since we have the tree structure in `options`,
    // we can traverse it to enforce the rule: If any child is in `newSelected`, parent MUST be in `newSelected`.

    const enforceParentSelection = (items, currentSelection) => {
      let updatedSelection = [...currentSelection];

      const checkNode = (node) => {
        let childSelected = false;

        // DFS to check children first
        if (node.Children && node.Children.length > 0) {
          node.Children.forEach((child) => {
            if (checkNode(child)) {
              childSelected = true;
            }
          });
        }

        // If current node is explicitly selected, or any child is selected, this node should be selected
        if (updatedSelection.includes(node.path) || childSelected) {
          if (!updatedSelection.includes(node.path)) {
            updatedSelection.push(node.path);
          }
          return true;
        }
        return false;
      };

      items.forEach((item) => checkNode(item));
      return updatedSelection;
    };

    newSelected = enforceParentSelection(options, newSelected);

    onChange(newSelected);
  };

  const renderTree = (items) => {
    return (
      <ul className="pl-4 border-l border-gray-200 ml-2">
        {items.map((item) => (
          <li key={item.path} className="my-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={item.path}
                checked={selected.includes(item.path)}
                onChange={() => handleCheck(item.path, item.Children)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor={item.path}
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                {item.name}
              </label>
            </div>
            {item.Children && renderTree(item.Children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="border p-4 rounded max-h-60 overflow-y-auto bg-gray-50">
      {renderTree(options)}
    </div>
  );
};

const DynamicForm = ({
  config,
  onSubmit,
  onClose,
  title,
  initialData = {},
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-lg overflow-y-auto relative animate-slide-in-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {config
            .filter((field) => field.showInForm !== false)
            .map((field, index) => (
              <div key={index} className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="mb-1 text-sm font-semibold text-gray-700"
                >
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[100px]"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    onChange={handleChange}
                    value={formData[field.name] || ""}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="" disabled>
                      Select {field.label}
                    </option>
                    {field.options.map((option, idx) => (
                      <option
                        key={idx}
                        value={
                          typeof option === "object" ? option.value : option
                        }
                      >
                        {typeof option === "object" ? option.label : option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "permissions" ? (
                  <PermissionTree
                    options={field.options}
                    selected={formData[field.name] || []}
                    onChange={(newSelected) =>
                      setFormData({ ...formData, [field.name]: newSelected })
                    }
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                )}
              </div>
            ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
