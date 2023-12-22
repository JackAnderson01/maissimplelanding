import GetAllBookingsController from "../../../controllers/Booking/GetAllBookingsController.js";
import PostBookingController from "../../../controllers/Booking/PostBookingController.js";
import connection from "../../../lib/connection.js";

const bookings = async (req, res) => {
  await connection();
  const method = req.method;

  const { page } = req.body;

  if (page && method == "POST") {
    let getBooking = await GetAllBookingsController(req, res);
  }

  switch (method) {
    case "POST":
      let result = await PostBookingController(req, res);

      break;
    case "GET":
      let getBooking = await GetAllBookingsController(req, res);
      break;
  }
};

export default bookings;
