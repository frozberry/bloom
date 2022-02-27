import {
  login,
  passwordResetUrl,
  resetPassword,
} from "../src/services/userService"
import jwt from "jsonwebtoken"
import { ResetPasswordToken } from "../src/lib/types"

const main = async () => {
  const url = await passwordResetUrl("3fa5a38b-e8fc-41a7-95d0-04f438ec3ff3")
  const split = url.split("/")
  const tokenString = split[split.length - 1]
  const updatedUser = await resetPassword("robin", tokenString)
  console.log(updatedUser)
}

main()
