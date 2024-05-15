const Schema = require("../models/schema"); // Import your schema model

// Function to save a new schema to the database
const saveSchema = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { title, assessmentCards, missionCards } = req.body;

    // Create a new schema document
    const newSchema = new Schema({
      title,
      assessmentCards,
      missionCards,
    });

    // Save the schema to the database
    await newSchema.save();

    res.status(201).json({ message: "Schema saved successfully" });
  } catch (error) {
    console.error("Error saving schema:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to fetch a schema from the database by ID
const getSchemaById = async (req, res) => {
  try {
    // Extract schema ID from request parameters
    const { id } = req.params;

    // Find the schema by ID in the database
    const schema = await Schema.findById(id);

    if (!schema) {
      // If schema with given ID is not found, return 404
      return res.status(404).json({ error: "Schema not found" });
    }

    // If schema is found, return it in the response
    res.json({ data: schema });
  } catch (error) {
    console.error("Error fetching schema:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  saveSchema,
  getSchemaById,
};
