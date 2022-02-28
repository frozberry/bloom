import { Button, Container, Divider, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import Loading from "../../components/Loading"
import { getExams } from "../../services/client/examsClient"
import { UserContext } from "../_app"

const styles = {
  testTitle: {},
  testDiv: {
    marginTop: 20,
    marginBottom: 20,
  },
  clickableTest: {
    cursor: "pointer",
  },
  divider: { marginTop: 20 },
}

const Admin = () => {
  const { isLoading, error, data } = useQuery("nextExam", getExams)
  // const router = useRouter()
  const user = useContext(UserContext)

  const [tests, setTests] = useState([])
  useEffect(() => {
    setTests(data)
  }, [data])

  if (!user) return "No user"
  if (isLoading) return <Loading />
  if (error) return "Error"

  const selectTest = (id) => {
    const newTests = tests.map((t) =>
      t.id === id ? { ...t, open: !t.open } : t
    )
    setTests(newTests)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await testService.deleteTest({ token: user.token, id })
        const newTests = tests.filter((t) => t.id !== id)
        setTests(newTests)
      } catch (err) {
        toast.error("error")
      }
    }
  }

  return (
    <Container>
      <Button
        variant="outlined"
        // onClick={() => history.push("/admin/new-test")}
      >
        New Test
      </Button>
      {tests &&
        tests.map((t) => (
          <div key={t.id} style={styles.testDiv}>
            <div onClick={() => selectTest(t.id)} style={styles.clickableTest}>
              <Typography variant="h5" style={styles.testTitle}>
                Test {t.num}
              </Typography>
              <Typography>{t.problems.length} questions</Typography>
            </div>
            <div>
              {t.open && (
                <>
                  {t.problems.map((p) => (
                    <div key={p.question}>
                      {/* <Problem problem={p} viewOnly /> */}
                    </div>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(t.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </>
              )}

              <Divider style={styles.divider} />
            </div>
          </div>
        ))}
    </Container>
  )
}

export default Admin
