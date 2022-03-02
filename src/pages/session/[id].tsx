import { Box, Container, Paper, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import useAuthQuery from "../../hooks/useAuthQuery"
import useEscapeComponent from "../../hooks/useEscapeComponent"
import { findExamById } from "../../services/client/examClient"

const Problem = ({
  problem,
  viewOnly,
}: {
  problem: any
  viewOnly: boolean
}) => {
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

const MultipleChoice = ({ problem, viewOnly }: any) => {
  // const dispatch = useDispatch()
  // const test = useSelector((state) => state.test)

  // const [shuffledOptions, setShuffledOptions] = useState([])

  // useEffect(() => {
  //   setShuffledOptions(_.shuffle(problem.options))
  // }, [])

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {problem.options.map((option: any) => {
        const selected = problem.selected === option
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

const InputAnswer = ({ problem, viewOnly }: any) => {
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
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { user, isLoading, error, data } = useAuthQuery(id, () =>
    findExamById(id)
  )
  const { escape, component } = useEscapeComponent(user, isLoading, error)

  if (escape) return component

  const exam = data

  console.log(data)

  return (
    <Container>
      <Typography>{exam.id}</Typography>
      <Typography>{exam.num}</Typography>
      <Typography>{exam.date}</Typography>
      {exam.problems.map((problem: any) => {
        return <Problem problem={problem} viewOnly={false} key={problem.id} />
      })}
    </Container>
  )
}

export default Page
