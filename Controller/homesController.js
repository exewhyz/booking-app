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
