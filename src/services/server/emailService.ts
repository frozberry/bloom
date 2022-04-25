import * as postmark from "postmark"
import { passwordResetUrl } from "./accountService"

export const sendPasswordResetEmail = async (userId: string, email: string) => {
  const url = passwordResetUrl(userId)

  // eslint-disable-next-line
  const client = new postmark.ServerClient(process.env.POSTMARK_SECRET!)

  client.sendEmail({
    From: "Bloom<support@bloomlearn.co.uk>j",
    To: email,
    Subject: "Bloom password reset",
    HtmlBody: `<html><body>Password reset ${url}</body></html>`,
    MessageStream: "outbound",
  })
}
