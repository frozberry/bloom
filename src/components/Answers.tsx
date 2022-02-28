import { useState } from "react"
import { Container } from "@mui/material"
import _ from "lodash"
import ToggleButtons from "./results/ToggleButtons"
import Answer from "./results/Answer"

const Answers = ({ gradedProblems }: any) => {
  const [view, setView] = useState("all")
  const correct = (p: any) => p.selected === p.correct
  const incorrect = (p: any) => p.selected !== p.correct

  const filteredProblems =
    view === "all"
      ? gradedProblems
      : view === "correct"
      ? gradedProblems.filter(correct)
      : gradedProblems.filter(incorrect)

  const orderedGradedProblems = _.sortBy(filteredProblems, (p) => p.num)

  return (
    <Container>
      <ToggleButtons view={view} setView={setView} />

      {orderedGradedProblems.map((problem) => (
        <Answer problem={problem} key={problem.id} />
      ))}
    </Container>
  )
}

export default Answers
