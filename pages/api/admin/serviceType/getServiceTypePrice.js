import GetServiceTypesPriceController from "../../../../controllers/Admin/ServiceType/GetServiceTypePriceController.js";
import connection from "../../../../lib/connection.js";

const getServiceTypesPrice = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result1 = await GetServiceTypesPriceController(req, res);
      break;
  }
};

export default getServiceTypesPrice;
