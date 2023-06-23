require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/error');

const connectDB = require('./config/db');
connectDB();

const express = require('express'); 
const app = express(); 

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/user", require("./routes/UserRoutes"))

app.use("/api/categories", require("./routes/CategoryRoutes"))

app.use('/api/events', require('./routes/EventRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`) 
})