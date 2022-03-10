import { Typography, Divider, Box } from "@mui/material"
import { GradedProblem } from "@prisma/client"
import Image from "next/image"
import InputAnswer from "./solutions/InputAnswer"
import MultipleChoiceAnswer from "./solutions/MultipleChoiceAnswer"

type Props = {
  problem: GradedProblem
}

const Solution = ({ problem }: Props) => {
  const isCorrect = (problem: GradedProblem) => {
    if (problem.multi) {
      return problem.selected === problem.correct
    }
    return Number(problem.selected) === Number(problem.correct)
  }

  const correct = isCorrect(problem)
  const tickOrCross = correct ? "✅" : "❌"
  console.log(problem.img)

  return (
    <Box key={problem.question} sx={{ mb: 4 }}>
      <Typography>
        <b>Question {problem.num}</b> {tickOrCross}
      </Typography>
      <Typography>{problem.question}</Typography>

      {problem.img && (
        <Box sx={{ my: 3 }}>
          <img src={problem.img} alt="problem image" />
        </Box>
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
