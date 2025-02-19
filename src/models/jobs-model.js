// Import mongoose and Schema from mongoose
import mongoose from "mongoose";

// Define the Job schema
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    posted: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    company_logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create and export the Job model
const JobModel = mongoose.models.Job ?? mongoose.model("Job", jobSchema);
export default JobModel;
