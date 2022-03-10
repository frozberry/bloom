import { Box } from "@mui/material"
import { Problem } from "@prisma/client"
import _ from "lodash"
import { useEffect, useState } from "react"
import { ProblemSubmission } from "../../lib/types"
import OptionPaper, { ColorTypes } from "../OptionPaper"

type Props = {
  problem: Problem
  existingSubmission: ProblemSubmission | undefined
  addOrReplaceSubmission: (option: string) => void
}

const MultipleChoice = ({
  problem,
  existingSubmission,
  addOrReplaceSubmission,
}: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  useEffect(() => {
    setShuffledOptions(_.shuffle(problem.options))
  }, [problem.options])

  return (
    // TODO this logic is duplicated in MultipleChoiceAnswer.tsx
    // Can be refactored to share the same views
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
      {shuffledOptions.map((option: any) => {
        const selected = existingSubmission?.selected === option
        const colorType = selected ? ColorTypes.SELECTED : ColorTypes.DEFAULT
        return (
          <OptionPaper
            option={option}
            colorType={colorType}
            onClick={() => addOrReplaceSubmission(option)}
            key={option}
          />
        )
      })}
    </Box>
  )
}

export default MultipleChoice
