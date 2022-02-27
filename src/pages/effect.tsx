// @ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"

const Page = () => {
  const [data, setData] = useState(null)
  console.log(data)

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => setData(res.data))
  }, [])

  if (!data) {
    return "Loading effect..."
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>
        <h1>
          <Link href="query">query</Link>
        </h1>
      </div>
    </div>
  )
}
export default Page
