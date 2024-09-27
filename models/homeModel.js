import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    homeType: {
      type: String,
      required: true,
      enum: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "Duplex", "Villa"],
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    images: {
      type: [String],
      required: true,
    },
    archieved: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("homes", homeSchema);

export default Home;
