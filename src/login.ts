import nodemailer from "nodemailer";

export async function emailLoginTransporter(config?: {
  email?: string;
  pass?: string;
}) {
  let transporter: ReturnType<typeof nodemailer.createTransport>;
  switch (config) {
    case undefined:
      {
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            // user: testAccount.user,
            user: "hailee.medhurst@ethereal.email",
            pass: "dRFqPn4jUETVcAEryN",
          },
        });
      }
      break;
    default:
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.email,
          pass: config.pass,
        },
      });
      break;
  }

  return transporter;
}
