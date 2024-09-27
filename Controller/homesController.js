import Home from "../models/homeModel.js";

export const getHomesController = async (req, res) => {
  try {
    // Logic to fetch homes from a database or API
    const homes = await Home.find({ archieved: false });
    // Return the fetched homes
    return res.status(200).json({
      succcess: true,
      message: "Successfully fetched homes",
      data: homes,
    });
  } catch (error) {
    // Error handling
    console.error("Failed to fetch homes: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch homes",
      data: error.message,
    });
  }
};

export const createHomeController = async (req, res) => {
  const { title, price, description, homeType, location, images, archieved } =
    req.body;
  const { userId, userRole } = req.user;
  if (!userId && userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized to create home",
    });
  }
  try {
    // Logic to create a new home in the database or API
    const newHome = new Home({
      title,
      price,
      description,
      homeType,
      location,
      images,
      archieved,
      createdBy: userId,
    });
    await newHome.save();
    // Return the created home
    return res.status(201).json({
      succcess: true,
      message: "Successfully created home",
    });
  } catch (error) {
    // Error handling
    console.error("Failed to create home: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create home",
    });
  }
};
