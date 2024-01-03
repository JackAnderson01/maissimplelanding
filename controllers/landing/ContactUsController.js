import Joi from "@hapi/joi";
import sendEmail from "../Admin/sendEmail";

const validator = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(4).required(),
  lastName: Joi.string().min(4).required(),
  message: Joi.string().min(50).max(300).required(),
});

export default async function ContactUsController(req, res) {
  try {
    const { email, firstName, lastName, message } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    await sendEmail(
      "Contact Us mail",
      `
        <p>Email: ${email}</p>
        <p>Contact Us email sent by: ${firstName} ${lastName}</p>
        <br/>
        <p>${message}</p>

        <br/>
        <P>Regards</P>
        `,
      "support@maidsimpl.com"
    );

    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
}
