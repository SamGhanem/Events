const express = require("express");
const app = express();
const port= 8000;
const cors = require('cors');
    
app.use(cors({origin:"http://localhost:3000"}));
require("./config/mongoose.config");
app.use(express.json(), express.urlencoded({ extended: true }));
const EventRoutes = require("./routes/events.routes");
EventRoutes(app);
    
app.listen(port, () => console.log(`The server is all fired up on port ${port}`));
