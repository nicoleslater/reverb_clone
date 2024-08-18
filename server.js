const app = require("./app.js");

require("dotenv").config();

const PORT = process.env.PORT || 6899;

app.listen(PORT, () => {
    console.log(`Products live on : ${PORT}`)
});