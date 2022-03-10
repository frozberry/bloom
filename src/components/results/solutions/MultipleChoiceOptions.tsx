import { GradedProblem } from "@prisma/client"
import OptionPaper from "../../OptionPaper"

type Props = {
  problem: GradedProblem
  option: string
}

const MultipleChoiceOptions = ({ problem, option }: Props) => {
  const correct = problem.correct === option

  if (correct) {
    return <OptionPaper option={option} colorType="correct" />
  }

  // If unselected
  if (!(problem.selected === option)) {
    return <OptionPaper option={option} colorType="default" />
  }

  // If incorrect
  return <OptionPaper option={option} colorType="incorrect" />
}

export default MultipleChoiceOptions
