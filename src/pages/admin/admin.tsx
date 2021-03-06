import { Button, Container, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getExams } from "../../services/client/examClient"
import useAuthQuery from "../../hooks/useAuthQuery"

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
  const { data, escape, component } = useAuthQuery("getExams", getExams)
  const [exams, setExams] = useState<any>([])

  useEffect(() => {
    setExams(data)
  }, [data])

  if (escape) return component

  const selectTest = (id: any) => {
    const newExam = exams.map((exam: any) =>
      exam.id === id ? { ...exam, open: !exam.open } : exam
    )
    setExams(newExam)
  }

  // const handleDelete = async (id) => {
  // if (window.confirm("Are you sure you want to delete this?")) {
  //   try {
  //     await testService.deleteTest({ token: user.token, id })
  //     const newTests = tests.filter((t) => t.id !== id)
  //     setTests(newTests)
  //   } catch (err) {
  //     toast.error("error")
  //   }
  // }
  // }

  return (
    <Container>
      <Button
        variant="outlined"
        // onClick={() => history.push("/admin/new-test")}
      >
        New Exam
      </Button>
      {exams &&
        exams.map((exam: any) => (
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
                  {exam.problems.map((p: any) => (
                    <div key={p.question}>
                      {/* <Problem problem={p} viewOnly /> */}
                    </div>
                  ))}

                  <Button
                    variant="outlined"
                    // onClick={() => handleDelete(exam.id)}
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
