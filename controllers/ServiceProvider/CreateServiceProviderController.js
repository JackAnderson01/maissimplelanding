import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import OTPEntity from "../../schema/auth/OTPSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import { uploadBase64Image } from "../Firebase/Chat/uploadBase64Image";
import CreateProfile from "../Firebase/CreateProfile";
import UpdateProfile from "../Firebase/UpdateProfile";
import blackListToken from "../Authentication/Token/BlackListToken";

const serviceProviderValidator = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  preferredName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).allow(null).required(),
  image: Joi.string().min(8).allow(null).required(),
  country: Joi.string().max(50).allow(null).required(),
  city: Joi.string().max(50).allow(null).required(),
  state: Joi.string().max(50).allow(null).required(),
  postal: Joi.string().min(2).max(10).allow(null).required(),
  street: Joi.string().min(5).max(150).required().allow(null),
  about: Joi.string().max(500).allow(null).required(),
  documents: Joi.array()
    .items(Joi.string().min(50).required())
    .min(2)
    .max(2)
    .required()
    .allow(null),
  uid: Joi.string().length(28).allow(null).required(),
  isEmailSignUp: Joi.boolean().allow(null).required(),
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
  runtime: "experimental-edge",
};

export default async function CreateServiceProviderController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner", "temp-cleaner");

    const {
      name,
      preferredName,
      email,
      phone,
      image,
      country,
      city,
      state,
      postal,
      street,
      about,
      documents,
      uid,
      isEmailSignUp,
    } = req.body;

    try {
      await serviceProviderValidator.validateAsync(req.body);
    } catch (err) {
      return res.status(400).send({ success: false, Error: err });
    }

    // const otpRecord = await OTPEntity.findOne({
    //   email: email,
    //   hasValidated: true,
    //   forPassword: false,
    // });

    const otpValidator = await checkOTPValidation(email);
    if (!otpValidator) {
      return res
        .status(400)
        .send({ success: false, error: "Profile not verified" });
    }

    const emailExist = await ServiceProviderEntity.findOne({ email: email });

    if (emailExist) {
      const updateResult = await ServiceProviderEntity.findOneAndUpdate(
        { email: email },
        {
          name: name ?? emailExist.name,
          preferredName: preferredName ?? emailExist.preferredName,
          phone: phone ?? emailExist.phone,
          image: image ?? emailExist.image,
          country: country ?? emailExist.country,
          state: state ?? emailExist.state,
          city: city ?? emailExist.city,
          postal: postal ?? emailExist.postal,
          street: street ?? emailExist.street,
          about: about ?? emailExist.about,
          documents: documents ?? emailExist.documents,
        },
        { new: true }
      );

      if (updateResult) {
        await checkIfCleanerSessionComplete(email);

        var fireUser = await FireUserEntity.findOne({ email: email });
        if (fireUser == null && uid != null) {
          const newFireUser = new FireUserEntity({
            uid: uid,
            email: email,
            name: name ?? emailExist.name,
            role: "cleaner",
            didUseEmailSignIn: isEmailSignUp ?? true,
          });
          fireUser = await newFireUser.save();

          //To create the database of chat
          await CreateProfile(
            uid,
            email,
            imageURL ??
              "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name ?? emailExist.name,
            "cleaners",
            false
          );
        }
        const uidRecord =
          uid == null ? (fireUser == null ? null : fireUser.uid) : uid;

        if (uidRecord != null) {
          await FireUserEntity.updateOne(
            { email: email },
            {
              name: name ?? emailExist.name,
            }
          );

          var imageURL = null;
          if (image != null) {
            imageURL = await uploadBase64Image(image, email);
          }

          //To create the database of chat
          await UpdateProfile(
            uidRecord,
            imageURL ??
              "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name ?? emailExist.name,
            "cleaners",
            false
          );
        }

        res.status(200).json({ success: true, result: updateResult });
      } else {
        res
          .status(200)
          .json({ success: false, message: "No documents were modified" });
      }

      // res.status(200).json({ success: true, result: updateUser });
    } else {
      if (uid == null) {
        return res.status(400).send({
          success: false,
          error: "UID is required for profile creation",
        });
      }

      const serviceProviderDetails = new ServiceProviderEntity({
        name: name,
        preferredName: preferredName,
        email: email,
        phone: phone,
        image: image,
        country: country,
        state: state,
        city: city,
        postal: postal,
        street: street,
        about: about,
        documents: documents,
      });

      const saveServiceProvider = await serviceProviderDetails.save();

      await checkIfCleanerSessionComplete(email);

      const fireUser = await FireUserEntity.findOne({ email: email });
      const uidRecord =
        uid == null ? (fireUser == null ? null : fireUser.uid) : uid;

      if (uidRecord != null) {
        const newFireUser = new FireUserEntity({
          uid: uidRecord,
          email: email,
          name: name,
          role: "cleaner",
          didUseEmailSignIn: isEmailSignUp ?? true,
        });

        var imageURL = null;
        if (image != null) {
          imageURL = await uploadBase64Image(image, email);
        }

        //To create the database of chat
        await CreateProfile(
          uidRecord,
          email,
          imageURL ??
            "https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name,
          "cleaners",
          false
        );

        const saveFireUser = await newFireUser.save();
      }

      const responseServiceProvider = {
        ...saveServiceProvider.toObject(),
        isSessionComplete: undefined,
      };

      res.status(200).json({ success: true, result: responseServiceProvider });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

export async function checkIfCleanerSessionComplete(email) {
  const cleaner = await ServiceProviderEntity.findOne({ email: email });
  const otpValidator = await checkOTPValidation(email);

  if (
    otpValidator &&
    cleaner != null &&
    cleaner.name != null &&
    cleaner.preferredName !== null &&
    cleaner.email != null &&
    cleaner.phone != null &&
    cleaner.image != null &&
    cleaner.country != null &&
    cleaner.city != null &&
    cleaner.state != null &&
    cleaner.postal != null &&
    cleaner.street != null &&
    cleaner.about != null &&
    cleaner.documents != null
  ) {
    // if (cleaner.isSessionComplete == false) {
    //   console.log("here 298");

    //   await blackListToken(req, res);

    //   console.log("here 302");
    // }

    const result = await ServiceProviderEntity.findOneAndUpdate(
      { email: email },
      { isSessionComplete: true }
    );
  }
}

export async function checkOTPValidation(email) {
  const isValidated = await OTPEntity.findOne({
    email: email,
    hasValidated: true,
    forPassword: false,
  });
  const fireUser = await FireUserEntity.findOne({
    email: email,
    didUseEmailSignIn: true,
  });

  return fireUser != null ? isValidated != null : true;
}
