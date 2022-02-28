import { Typography, Container, Paper, Divider, Box } from "@mui/material"
import Image from "next/image"
import InputAnswer from "./solutions/InputAnswer"
import MultipleChoiceAnswer from "./solutions/MultipleChoiceAnswer"

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
