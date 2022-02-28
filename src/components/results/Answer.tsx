import { Typography, Container, Paper, Divider, Box } from "@mui/material"
import Image from "next/image"

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
const MultipleChoiceSelections = ({ problem, option }) => {
  const calculateColor = (problem: any, option: any) => {
    if (option === problem.correct) {
      return "green"
    }
    if (option === problem.selected) {
      return "red"
    }
    return null
  }

  const color = calculateColor(problem, option)
  console.log(option)

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
            color === "green" ? "#0E6245" : color === "red" ? "#A41C4E" : null,
          fontWeight: color === "green" || color === "red" ? "bold" : null,
          letterSpacing: color === "green" || color === "red" ? 0.5 : null,
        }}
      >
        {option}
      </Typography>
    </Paper>
  )
}

const MultiAnswer = ({ problem }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {problem.options.map((option: any) => (
        <MultipleChoiceSelections
          problem={problem}
          option={option}
          key={option}
        />
      ))}
    </Box>
  )
}

const SingleAnswer = ({ problem, correct }: any) => {
  return (
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
          The correct answer was: <b>{problem.correct}</b> {problem.unit}
        </Typography>
      )}
    </>
  )
}

const Answer = ({ problem }) => {
  const isCorrect = (p: any) => {
    if (p.multi) {
      return p.selected === p.correct
    }
    return Number(p.selected) === Number(p.correct)
  }

  const correct = isCorrect(problem)
  const tickOrCross = correct ? "✅" : "❌"

  return (
    <div key={problem.question} style={styles.root}>
      <Typography>
        <b>Question {problem.num}</b> {tickOrCross}
      </Typography>
      <Typography>{problem.question}</Typography>

      {problem.img && (
        <Image
          src={problem.img}
          alt="image"
          layout="intrinsic"
          width={200}
          height={100}
        />
      )}

      <MultiAnswer problem={problem} />

      {!problem.selected && (
        <Typography sx={{ mt: 5 }}>
          <i>You did not answer this question</i>
        </Typography>
      )}

      {!problem.multi && <SingleAnswer problem={problem} correct={correct} />}
      <Divider style={styles.divider} />
    </div>
  )
}

export default Answer
