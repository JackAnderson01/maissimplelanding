import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export default async function sendEmail(subject, message, email) {
  // Set up SES client
  const sesClient = new SESClient({
    region: process.env.AWS_SES_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // Create the email parameters
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.AWS_SES_SENDER,
  };

  try {
    // Send the email
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    console.log("Email sent:", result);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
