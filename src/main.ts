const clipboard = import("clipboardy");
import "dotenv/config";
import { emailLoginTransporter } from "./login";

const appPassword = process.env["GMAIL_PASS"];
const gmailEmail = process.env["GMAIL_EMAIL"];

let lastClipBoardValue = "";

async function copyFromClipboard() {}

async function main() {
  const clipText = (await clipboard).default.readSync();
  const transporter = await emailLoginTransporter({
    email: gmailEmail,
    pass: appPassword,
  });
  const info = await transporter.sendMail({
    from: "Tochi Foo 😵 <tochieatsbeats@gmail.com>",
    to: "tochieatsbeats@gmail.com",
    subject: "copyPaste : Initial Email",
    text: clipText,
  });

  console.log(info);
}

main();
