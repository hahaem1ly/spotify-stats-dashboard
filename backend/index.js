require("dotenv").config();
const express = require("express");
const cors = require("cors");

const spotifyRoutes = require("./routes/spotify");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/spotify", spotifyRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
