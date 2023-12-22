import CreateServiceProviderController from "../../../controllers/ServiceProvider/CreateServiceProviderController.js";
import connection from "../../../lib/connection.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

const createServiceProvider = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await CreateServiceProviderController(req, res);
      break;

    // case "GET":
    //   let result1 = await GetALLServiceProvidersController(req, res);
    //   break;
  }
};

export default createServiceProvider;
