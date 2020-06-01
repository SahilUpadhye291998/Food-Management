const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/api/user");
const connectionString = require("./secert/secret").connectionString;

const app = express();
process.setMaxListeners(0);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = process.env.MONGO_URI || connectionString;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection to database is done`);
  })
  .catch((err) => {
    console.error(`${err}`);
  });

app.use("/api/user", user);
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
