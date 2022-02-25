import postmark from "postmark"

const passwordReset = (email: string, resetUrl: string) => {
  const client = new postmark.ServerClient(process.env.POSTMARK_SECRET!)

  client.sendEmailWithTemplate({
    From: "support@waterfrontlearn.com",
    To: email,
    TemplateAlias: "password-reset",
    TemplateModel: {
      url: resetUrl,
    },
  })
}

module.exports = {
  passwordReset,
}
