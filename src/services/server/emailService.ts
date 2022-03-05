import postmark from "postmark"
import { passwordResetUrl } from "./accountService"

export const sendPasswordResetEmail = (userId: string, email: string) => {
  const url = passwordResetUrl(userId)

  // eslint-disable-next-line
  const client = new postmark.ServerClient(process.env.POSTMARK_SECRET!)

  client.sendEmailWithTemplate({
    From: "support@waterfrontlearn.com",
    To: email,
    TemplateAlias: "password-reset",
    TemplateModel: {
      url,
    },
  })
}
