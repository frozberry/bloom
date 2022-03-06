import { Box, Paper, Typography } from "@mui/material"
import { Problem } from "@prisma/client"
import _ from "lodash"
import { useEffect, useState } from "react"
import { ProblemSubmission } from "../../lib/types"

type Props = {
  problem: Problem
  viewOnly: boolean
  existingSubmission: ProblemSubmission | undefined
  addOrReplaceSubmission: (option: string) => void
}

const MultipleChoice = ({
  problem,
  viewOnly,
  existingSubmission,
  addOrReplaceSubmission,
}: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  useEffect(() => {
    setShuffledOptions(_.shuffle(problem.options))
  }, [problem.options])

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {shuffledOptions.map((option: any) => {
        const selected = existingSubmission?.selected === option
        return (
          <Paper
            key={option}
            sx={{
              py: 1.5,
              px: 6,
              mr: 2,
              backgroundColor: selected ? "primary.light" : null,
              textColor: "white",
              cursor: "pointer",
            }}
            // onClick={viewOnly ? null : () => addOrReplaceSubmission(option)}
            onClick={() => addOrReplaceSubmission(option)}
          >
            <Typography mb={0}>{option}</Typography>
          </Paper>
        )
      })}
    </Box>
  )
}

export default MultipleChoice
