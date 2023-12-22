// import { Server } from "socket.io";
// import connection from "../../lib/connection";
// import { admin } from "../../controllers/Admin/admin-authorizer";
// import FireUserEntity from "../../schema/firebase/FireUserSchema";
// import {
//   createImageMessage,
//   createTextMessage,
// } from "../../controllers/Firebase/Chat/sendMessage";
// import Joi from "@hapi/joi";

// const getMessagesValidator = Joi.object({
//   uid: Joi.string().min(28).required(),
//   receiverUID: Joi.string().min(28).required(),
// });

// const sendMessageValidator = Joi.object({
//   email: Joi.string().email().required(),
//   message: Joi.string().min(1).max(500).required().allow(null),
//   receiverUID: Joi.string().min(28).required(),
//   image: Joi.string().min(55).required().allow(null),
// });

// async function ioHandler(req, res) {
//   await connection();

//   if (res.socket.server.io) {
//     console.log("Already set up");
//     res.end();
//     return;
//   }

//   const allowedOrigins = [
//     "http://localhost:5000",
//     "http://app.maidsimpl.com",
//     "http://portal.maidsimpl.com",
//     "https://app.maidsimpl.com",
//     "https://portal.maidsimpl.com",
//     "*",
//   ];

//   var io = null;
//   try {
//     io = new Server(res.socket.server, {
//       path: "/api/socket",
//       addTrailingSlash: false,
//       cors: {
//         origin: function (origin, callback) {
//           if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//           } else {
//             callback(new Error("Not allowed by CORS"));
//           }
//         },
//         methods: ["GET", "POST"],
//         credentials: true,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   // const io = new Server(res.socket.server, {
//   //   path: "/api/socket_io",
//   //   addTrailingSlash: false,
//   // });
//   res.socket.server.io = io;

//   io.on("connection", (socket) => {
//     socket.on("get-messages", async (dataObj) => {
//       const { uid, receiverUID } = dataObj;

//       const { error } = await getMessagesValidator.validateAsync(dataObj);

//       if (error) {
//         socket.emit("error", { success: false, error: error });
//       } else {
//         const fireUser = await FireUserEntity.findOne({ uid: uid });

//         if (fireUser == null) {
//           socket.emit("error", {
//             success: false,
//             error: "No such fire user found, please resignup",
//           });
//         } else {
//           admin
//             .collection(fireUser.role)
//             .doc(uid)
//             .collection(receiverUID)
//             .orderBy("sentTime", "asc")
//             .onSnapshot((messagesSnapshot) => {
//               messagesSnapshot.docs.forEach((doc) => {
//                 socket.emit("message", doc.data());
//               });
//             });
//         }
//       }
//     });

//     socket.on("send-message", async (dataObj) => {
//       const { email, message, receiverUID, image } = dataObj;

//       const { error } = await sendMessageValidator.validateAsync(dataObj);

//       if (error) {
//         socket.emit("error", { success: false, error: error });
//       } else if (message == null && image == null) {
//         socket.emit("error", {
//           success: false,
//           error: "Please type a message or send an image",
//         });
//       } else {
//         const fireUser = await FireUserEntity.findOne({ email: email });

//         if (fireUser == null) {
//           socket.emit("error", {
//             success: false,
//             error: "No fire user found, please resignup",
//           });
//         } else {
//           let response = false;
//           if (message == null) {
//             response = await createImageMessage(
//               receiverUID,
//               fireUser.uid,
//               image,
//               fireUser.role
//             );
//           } else {
//             response = await createTextMessage(
//               receiverUID,
//               fireUser.uid,
//               message,
//               fireUser.role
//             );
//           }
//         }
//       }

//       // io.to(roomId).emit("receive-message", chat);
//     });
//   });

//   console.log("Setting up socket");
//   res.end();
// }

// export default ioHandler;
