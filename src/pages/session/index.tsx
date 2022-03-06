import {
  Box,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { ExamSession, GradedProblem, Problem } from "@prisma/client"
import dayjs, { Dayjs } from "dayjs"
import { useRouter } from "next/router"
import useAuthQuery from "../../hooks/useAuthQuery"
import { ExamWithProblems } from "../../lib/types"
import { findExamById } from "../../services/client/examClient"
import {
  findActiveExam,
  findUsersExamSession,
} from "../../services/client/examSessionClient"

type Props = {
  problem: GradedProblem
  viewOnly: boolean
}
const Problem = ({ problem, viewOnly }: Props) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography>
        <b>Question {problem.num}</b>
      </Typography>
      <Typography sx={{ mb: 3 }}>{problem.question}</Typography>
      {/* {problem.img && (
        <div style={styles.center}>
          <img style={styles.img} src={problem.img} />
        </div>
      )} */}
      {problem.multi ? (
        <MultipleChoice problem={problem} viewOnly={viewOnly} />
      ) : (
        <InputAnswer problem={problem} viewOnly={viewOnly} />
      )}
    </Box>
  )
}

const MultipleChoice = ({ problem, viewOnly }: Props) => {
  console.log(viewOnly)
  // const dispatch = useDispatch()
  // const test = useSelector((state) => state.test)

  // const [shuffledOptions, setShuffledOptions] = useState([])

  // useEffect(() => {
  //   setShuffledOptions(_.shuffle(problem.options))
  // }, [])

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {problem.options.map((option: any) => {
        // const selected = problem.selected === option
        return (
          <Paper
            key={option}
            sx={{
              py: 1.5,
              px: 6,
              mr: 2,
              backgroundColor: "primary.light",
              textColor: "white",
              cursor: "pointer",
            }}
            // onClick={
            //   viewOnly
            //     ? null
            //     : () => dispatch(selectOption(test, problem.question, option))
            // }
          >
            <Typography mb={0}>{option}</Typography>
          </Paper>
        )
      })}
    </Box>
  )
}

const InputAnswer = ({ problem, viewOnly }: Props) => {
  // const dispatch = useDispatch()
  // const test = useSelector((state) => state.test)

  // const handleChange = (input) => {
  //   dispatch(selectOption(test, problem.question, input))
  // }

  return (
    <>
      {!viewOnly && (
        <>
          <TextField
            type="number"
            // onChange={() => handleChange(event.target.value)}
            defaultValue={problem.selected}
            // prevents scroll changing the input
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

const Page = () => {
  const { data, escape, component } = useAuthQuery(
    "examSession",
    findActiveExam
  )

  if (escape) return component

  const { exam, examSession } = data as {
    exam: ExamWithProblems
    examSession: ExamSession
  }
  console.log(exam)
  console.log(examSession)

  const formatTime = (date: Date | Dayjs) => dayjs(date).format("hh:mma")
  const { start } = examSession
  const end = dayjs(start).add(45, "minute")

  return (
    <Container>
      <Typography>You have 45 minutes to complete this test</Typography>
      <Typography>Start: {formatTime(start)}</Typography>
      <Typography>End: {formatTime(end)}</Typography>
      <Divider sx={{ mb: 4 }} />

      {exam.problems.map((problem: any) => {
        return <Problem problem={problem} viewOnly={false} key={problem.id} />
      })}
    </Container>
  )
}

export default Page
