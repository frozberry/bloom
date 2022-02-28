import { Button, Container, Divider, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getExams } from "../../services/client/examClient"
import useVerifyApi from "../../useVerifyApi/foo"
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

  const [exams, setExams] = useState([])
  useEffect(() => {
    setExams(data)
  }, [data])

  const { escape, component } = useVerifyApi(user, isLoading, error)
  if (escape) return component

  const selectTest = (id) => {
    const newExam = exams.map((exam) =>
      exam.id === id ? { ...exam, open: !exam.open } : exam
    )
    setExams(exams)
  }

  const handleDelete = async (id) => {
    // if (window.confirm("Are you sure you want to delete this?")) {
    //   try {
    //     await testService.deleteTest({ token: user.token, id })
    //     const newTests = tests.filter((t) => t.id !== id)
    //     setTests(newTests)
    //   } catch (err) {
    //     toast.error("error")
    //   }
    // }
  }

  return (
    <Container>
      <Button
        variant="outlined"
        // onClick={() => history.push("/admin/new-test")}
      >
        New Exam
      </Button>
      {exams &&
        exams.map((exam) => (
          <div key={exam.id} style={styles.testDiv}>
            <div
              onClick={() => selectTest(exam.id)}
              style={styles.clickableTest}
            >
              <Typography variant="h5" style={styles.testTitle}>
                Test {exam.num}
              </Typography>
              <Typography>{exam.problems.length} questions</Typography>
            </div>
            <div>
              {exam.open && (
                <>
                  {exam.problems.map((p) => (
                    <div key={p.question}>
                      {/* <Problem problem={p} viewOnly /> */}
                    </div>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(exam.id)}
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
