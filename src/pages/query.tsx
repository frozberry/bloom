import { useQuery } from "react-query"
import Link from "next/link"

const Page = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  )

  if (isLoading) return "Loading query..."

  // if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>
        <h1>
          <Link href="effect">effect</Link>
        </h1>
      </div>
    </div>
  )
}
export default Page
