const verifyUserRoleIsAdmin = () => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only admin users can perform this action.",
    });
  }
  next();
};

export default verifyUserRoleIsAdmin;
