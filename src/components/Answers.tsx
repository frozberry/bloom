import { useState } from "react"
import { Button, Divider, Paper, Typography, Container } from "@mui/material"
import _ from "lodash"
import ToggleButtons from "./results/ToggleButtons"

const paperStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 20,
  paddingLeft: 20,
  marginRight: 20,
}

const styles = {
  paperRed: { ...paperStyle, backgroundColor: "#FDE2DD" },
  paperGreen: {
    ...paperStyle,
    backgroundColor: "#CBF4C9",
  },
  paper: paperStyle,
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  root: {
    marginBottom: 20,
  },
  divider: {
    marginTop: 40,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    marginTop: 10,
    marginBottom: 20,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}

const Answers = ({ gradedProblems }: any) => {
  const [view, setView] = useState("all")
  const correct = (p: any) => p.selected === p.correct
  const incorrect = (p: any) => p.selected !== p.correct

  const filteredProblems =
    view === "all"
      ? gradedProblems
      : view === "correct"
      ? gradedProblems.filter(correct)
      : gradedProblems.filter(incorrect)

  const orderedGradedProblems = _.sortBy(filteredProblems, (p) => p.num)

  const isCorrect = (p: any) => {
    if (p.multi) {
      return p.selected === p.correct
    }
    return Number(p.selected) === Number(p.correct)
  }

  const calculateColor = (problem: any, option: any) => {
    if (option === problem.correct) {
      return "green"
    }
    if (option === problem.selected) {
      return "red"
    }
    return null
  }

  return (
    <Container>
      <ToggleButtons view={view} setView={setView} />
      {orderedGradedProblems.map((problem) => {
        const correct = isCorrect(problem)
        return (
          <div key={problem.question} style={styles.root}>
            <Typography>
              <b>Question {problem.num}</b>
              {correct ? " ✔️" : " ❌"}
            </Typography>
            <Typography>{problem.question}</Typography>
            <div style={styles.center}>
              <img style={styles.img} src={problem.img} />
            </div>
            <div style={styles.flex}>
              {problem.options.map((option: any) => {
                const color = calculateColor(problem, option)
                return (
                  <Paper
                    key={option}
                    style={
                      color === "green"
                        ? styles.paperGreen
                        : color === "red"
                        ? styles.paperRed
                        : styles.paper
                    }
                  >
                    <Typography
                      style={{
                        color:
                          color === "green"
                            ? "#0E6245"
                            : color === "red"
                            ? "#A41C4E"
                            : null,
                        fontWeight:
                          color === "green" || color === "red" ? "bold" : null,
                        letterSpacing:
                          color === "green" || color === "red" ? 0.5 : null,
                      }}
                    >
                      {option}
                    </Typography>
                  </Paper>
                )
              })}
            </div>
            {!problem.selected && (
              <Typography style={{ marginTop: 30 }}>
                <i>You did not answer this question</i>
              </Typography>
            )}
            {!problem.multi && (
              <>
                <Typography>
                  {problem.selected && (
                    <>
                      You answered: <b>{problem.selected}</b> {problem.unit}
                    </>
                  )}
                </Typography>
                {!correct && (
                  <Typography>
                    The correct answer was: <b>{problem.correct}</b>{" "}
                    {problem.unit}
                  </Typography>
                )}
              </>
            )}
            <Divider style={styles.divider} />
          </div>
        )
      })}
    </Container>
  )
}

export default Answers
