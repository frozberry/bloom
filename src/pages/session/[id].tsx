import { Box, Container, Paper, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useQuery } from "react-query"
import useVerifyQuery from "../../hooks/useVerifyQuery"
import { findExamById } from "../../services/client/examClient"
import { UserContext } from "../_app"

const styles = {
  paper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginRight: 20,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    marginTop: 10,
    marginBottom: 20,
  },
}

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
      {problem.img && (
        <div style={styles.center}>
          <img style={styles.img} src={problem.img} />
        </div>
      )}
      {problem.multi ? (
        <MultipleChoice problem={problem} viewOnly={viewOnly} />
      ) : (
        <InputAnswer problem={problem} viewOnly={viewOnly} />
      )}
    </Box>
  )
}

const MultipleChoice = ({ problem, viewOnly }) => {
  // const dispatch = useDispatch()
  // const test = useSelector((state) => state.test)

  // const [shuffledOptions, setShuffledOptions] = useState([])

  // useEffect(() => {
  //   setShuffledOptions(_.shuffle(problem.options))
  // }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {problem.options.map((option) => {
        const selected = problem.selected === option
        return (
          <Paper
            key={option}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              marginRight: 20,
              backgroundColor: selected ? "#4287f5" : null,
              textColor: "white",
              cursor: "pointer",
            }}
            // onClick={
            //   viewOnly
            //     ? null
            //     : () => dispatch(selectOption(test, problem.question, option))
            // }
          >
            <Typography
              style={{
                color: selected ? "white" : null,
              }}
            >
              {option}
            </Typography>
          </Paper>
        )
      })}
    </div>
  )
}

const InputAnswer = ({ problem, viewOnly }) => {
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
            onChange={() => handleChange(event.target.value)}
            defaultValue={problem.selected}
            // prevents scroll changing the input
            onWheelCapture={(e) => {
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

  const { isLoading, error, data } = useQuery(id, () => findExamById(id))
  const user = useContext(UserContext)
  const { escape, component } = useVerifyQuery(user, isLoading, error)

  if (escape) return component

  const exam = data

  console.log(data)

  return (
    <Container>
      <Typography>{exam.id}</Typography>
      <Typography>{exam.num}</Typography>
      <Typography>{exam.date}</Typography>
      {exam.problems.map((problem) => {
        return <Problem problem={problem} key={problem.id} />
      })}
    </Container>
  )
}

export default Page
