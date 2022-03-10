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
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
