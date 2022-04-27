import * as postmark from "postmark"
import { passwordResetUrl } from "./accountService"

// eslint-disable-next-line
const client = new postmark.ServerClient(process.env.POSTMARK_SECRET!)

export const sendPasswordResetEmail = async (userId: string, email: string) => {
  const url = passwordResetUrl(userId)

  client.sendEmail({
    From: "Bloom<support@bloomlearn.co.uk>",
    To: email,
    Subject: "Bloom password reset",
    HtmlBody: `<html><body>Password reset ${url}</body></html>`,
    MessageStream: "outbound",
  })
}

export const sendContactMessageEmail = async (
  name: string,
  email: string,
  message: string
) => {
  // Regex to replaceAll, since replaceAll doesn't work Vercel
  const withLineBreaks = message.replace("/:/\n", "<br/>")
  client.sendEmail({
    From: "Bloom<messages@bloomlearn.co.uk>",
    To: "henry@henrywu.co.uk",
    Subject: "New message",
    HtmlBody: `
    <html><body>
    <p>From: ${name}</p>
    <p>Email: ${email}</p>
    <p>${withLineBreaks}</p>
    </body></html>`,
    MessageStream: "outbound",
  })
}
