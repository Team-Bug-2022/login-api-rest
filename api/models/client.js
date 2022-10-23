import mongoose from "mongoose";

const schemaClient = {
    code: String,
    name: String,
    lastName: String,
    documentType: String,
    documentNumber: String,
    palmPrint: String,
    password: String,
  };

  const Client = mongoose.model("Client", schemaClient, "clients");

export default Client;