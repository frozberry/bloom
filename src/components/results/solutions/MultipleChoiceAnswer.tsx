import { Box } from "@mui/material"
import { GradedProblem } from "@prisma/client"
import MultipleChoiceOptions from "./MultipleChoiceOptions"

type Props = {
  problem: GradedProblem
}

const MultipleChoiceAnswer = ({ problem }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        alignItems: {
          xs: "start",
          sm: "center",
        },
        flexWrap: "wrap",
      }}
    >
      {problem.options.map((option: string) => (
        <MultipleChoiceOptions problem={problem} option={option} key={option} />
      ))}
    </Box>
  )
}

export default MultipleChoiceAnswer
