import { TextField, Typography } from "@mui/material"
import { Problem } from "@prisma/client"
import { ProblemSubmission } from "../../lib/types"

type Props = {
  problem: Problem
  viewOnly: boolean
  existingSubmission: ProblemSubmission | undefined
  addOrReplaceSubmission: (option: string) => void
}

const InputAnswer = ({
  problem,
  viewOnly,
  existingSubmission,
  addOrReplaceSubmission,
}: Props) => {
  return (
    <>
      {!viewOnly && (
        <>
          <TextField
            type="number"
            onChange={(event: any) =>
              addOrReplaceSubmission(event.target.value)
            }
            defaultValue={existingSubmission?.selected}
            // Prevents scroll changing the input
            onWheelCapture={(e: any) => {
              e.target.blur()
            }}
          />
          {problem.unit && (
            <Typography display="inline">{problem.unit}</Typography>
          )}
        </>
      )}
    </>
  )
}

export default InputAnswer
