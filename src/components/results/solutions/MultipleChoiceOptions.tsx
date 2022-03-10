import { GradedProblem } from "@prisma/client"
import OptionPaper, { ColorTypes } from "../../OptionPaper"

type Props = {
  problem: GradedProblem
  option: string
}

const MultipleChoiceOptions = ({ problem, option }: Props) => {
  const correct = problem.correct === option

  if (correct) {
    return <OptionPaper option={option} colorType={ColorTypes.CORRECT} />
  }

  // If unselected
  if (!(problem.selected === option)) {
    return <OptionPaper option={option} colorType={ColorTypes.DEFAULT} />
  }

  // If incorrect
  return <OptionPaper option={option} colorType={ColorTypes.INCORRECT} />
}

export default MultipleChoiceOptions
