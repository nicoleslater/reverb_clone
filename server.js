const app = require("./app.js");

require("dotenv").config();

const PORT = process.env.PORT || 4578;

app.listen(PORT, () => {
    console.log(`Products live on : ${PORT}`)
});