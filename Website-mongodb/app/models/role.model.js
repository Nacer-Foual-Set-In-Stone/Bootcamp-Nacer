const mongoose = require("mongoose");
//role de l'admin
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;
