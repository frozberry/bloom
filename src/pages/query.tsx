import { useQuery } from "react-query"
import Link from "next/link"
import { User } from "@prisma/client"
import axios from "axios"

const Page = () => {
  const { isLoading, error, data } = useQuery<User[]>("repoData", () =>
    axios.get("/api/users").then((res) => res.data)
  )

  if (isLoading) return "Loading query..."

  if (error) return "An error has occurred: "

  return (
    <div>
      {data!.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
      <div>
        <h1>
          <Link href="effect">effect</Link>
        </h1>
      </div>
    </div>
  )
}
export default Page
