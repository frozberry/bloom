import { Button, Container } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { ViewOptions } from "../../lib/types"

type Props = {
  view: ViewOptions
  setView: Dispatch<SetStateAction<ViewOptions>>
}

const ToggleButton = ({ view, setView }: Props) => {
  return (
    <Container
      sx={{
        display: "flex",
        fleDirection: "row",
        justifyContent: "center",
        my: 3,
      }}
    >
      <Button
        color={view === "all" ? "primary" : "inherit"}
        onClick={() => setView("all")}
      >
        All
      </Button>
      <Button
        color={view === "correct" ? "primary" : "inherit"}
        onClick={() => setView("correct")}
      >
        Correct
      </Button>
      <Button
        color={view === "incorrect" ? "primary" : "inherit"}
        onClick={() => setView("incorrect")}
      >
        Incorrect
      </Button>
    </Container>
  )
}

export default ToggleButton
