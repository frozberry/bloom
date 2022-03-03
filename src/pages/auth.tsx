import { getCsrfToken, getProviders, signIn } from "next-auth/react"

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
const onClick = () =>
  signIn("credentials", { email: "pannicope@gmail.com", password: "abc" })

export default function SignIn({ csrfToken }) {
  return (
    <div>
      <button onClick={onClick}>Sign In</button>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
