const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const Routes = require("./routes/route.js")


dotenv.config();
const PORT = process.env.PORT || 6000

app.use(express.json({ limit: '10mb' }))
app.use(cors())
mongoose
    .connect('mongodb://127.0.0.1:27017/school', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})