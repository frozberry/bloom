import { Typography, Container, Paper, Divider, Box } from "@mui/material"
import Image from "next/image"

const MultipleChoiceOptions = ({ problem, option }) => {
  const correct = problem.correct === option

  if (problem.multi) {
    console.log(problem)
  }

  if (correct) {
    return (
      <Paper
        key={option}
        sx={{
          py: 1.5,
          px: 6,
          mr: 2,
          //TODO Use theme color
          backgroundColor: "#CBF4C9",
        }}
      >
        <Typography color={correct ? "green" : "red"} sx={{ mb: 0 }}>
          <b>{option}</b>
        </Typography>
      </Paper>
    )
  }

  if (!(problem.selected === option)) {
    return (
      <Paper key={option} sx={{ py: 1.5, px: 6, mr: 2 }}>
        <Typography sx={{ mb: 0 }}>{option}</Typography>
      </Paper>
    )
  }

  return (
    <Paper
      key={option}
      sx={{
        py: 1.5,
        px: 6,
        mr: 2,
        // TODO Use theme color
        backgroundColor: "#FDE2DD",
      }}
    >
      <Typography color={correct ? "green" : "red"} sx={{ mb: 0 }}>
        {option}
      </Typography>
    </Paper>
  )
}

const MultipleChoiceAnswer = ({ problem }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {problem.options.map((option: any) => (
        <MultipleChoiceOptions problem={problem} option={option} key={option} />
      ))}
    </Box>
  )
}

const InputAnswer = ({ problem, correct }: any) => {
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

const Solution = ({ problem }) => {
  const isCorrect = (p: any) => {
    if (p.multi) {
      return p.selected === p.correct
    }
    return Number(p.selected) === Number(p.correct)
  }

  const correct = isCorrect(problem)
  const tickOrCross = correct ? "✅" : "❌"

  return (
    <Box key={problem.question} sx={{ mb: 4 }}>
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

      <MultipleChoiceAnswer problem={problem} />

      {!problem.selected && (
        <Typography sx={{ mt: 5 }}>
          <i>You did not answer this question</i>
        </Typography>
      )}

      {!problem.multi && <InputAnswer problem={problem} correct={correct} />}
      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Solution
