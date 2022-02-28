import { Box, Paper, Typography } from "@mui/material"
import MultipleChoiceOptions from "./MultipleChoiceOptions"

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

export default MultipleChoiceAnswer
