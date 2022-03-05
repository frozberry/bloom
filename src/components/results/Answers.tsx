import { useState } from "react"
import { Container } from "@mui/material"
import _ from "lodash"
import ToggleButtons from "./ToggleButtons"
import Solution from "./Solution"
import { GradedProblem } from "@prisma/client"
import { ViewOptions } from "../../lib/types"

type Props = {
  gradedProblems: GradedProblem[]
}

const Answers = ({ gradedProblems }: Props) => {
  const [view, setView] = useState<ViewOptions>(ViewOptions.ALL)

  const correct = (p: GradedProblem) => p.selected === p.correct
  const incorrect = (p: GradedProblem) => p.selected !== p.correct

  const filteredProblems =
    view === ViewOptions.ALL
      ? gradedProblems
      : view === ViewOptions.CORRECT
      ? gradedProblems.filter(correct)
      : gradedProblems.filter(incorrect)

  const orderedGradedProblems = _.sortBy(filteredProblems, (p) => p.num)

  return (
    <Container>
      <ToggleButtons view={view} setView={setView} />

      {orderedGradedProblems.map((problem) => (
        <Solution problem={problem} key={problem.id} />
      ))}
    </Container>
  )
}

export default Answers
