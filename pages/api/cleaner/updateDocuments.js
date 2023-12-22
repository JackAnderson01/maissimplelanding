import UpdateDocumentsController from "../../../controllers/ServiceProvider/UpdateDocumentsController.js";
import connection from "../../../lib/connection.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

const UpdateDocuments = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await UpdateDocumentsController(req, res);
      break;
  }
};

export default UpdateDocuments;
