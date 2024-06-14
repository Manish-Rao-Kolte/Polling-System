import "dotenv/config.js";
import { app } from "./app.js";
import connetDB from "./config/mongoose.config.js";

const port = process.env.PORT || 6000;

connetDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("error", err);
        });
        app.listen(port, () => {
            console.log(`server is running on port : ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Mongo DB connection failure: ${err}`);
    });
