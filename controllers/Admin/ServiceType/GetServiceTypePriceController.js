import ServiceTypeEntity from "../../../schema/Price/ServiceTypeSchema";

export default async function GetServiceTypesPriceController(req, res) {
  try {
    ServiceTypeEntity.find({})
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      })
      .catch((err) => {
        res.status(422).json({
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
