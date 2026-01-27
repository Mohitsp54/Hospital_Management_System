const Role = require("../models/Role");

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private/Admin
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a new role
// @route   POST /api/roles
// @access  Private/Admin
const addRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Please add a role name" });
    }

    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await Role.create({
      name,
      permissions: permissions || [],
    });

    res.status(201).json(role);
  } catch (error) {
    console.error("Error adding role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private/Admin
const updateRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const role = await Role.findById(req.params.id);

    if (role) {
      role.name = name || role.name;
      role.permissions = permissions || role.permissions;
      const updatedRole = await role.save();
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private/Admin
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (role) {
      await role.deleteOne();
      res.status(200).json({ id: req.params.id, message: "Role deleted" });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
};
