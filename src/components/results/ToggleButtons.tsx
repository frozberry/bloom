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
        color={view === ViewOptions.ALL ? "primary" : "inherit"}
        onClick={() => setView(ViewOptions.ALL)}
      >
        All
      </Button>
      <Button
        color={view === ViewOptions.CORRECT ? "primary" : "inherit"}
        onClick={() => setView(ViewOptions.CORRECT)}
      >
        Correct
      </Button>
      <Button
        color={view === ViewOptions.INCORRECT ? "primary" : "inherit"}
        onClick={() => setView(ViewOptions.INCORRECT)}
      >
        Incorrect
      </Button>
    </Container>
  )
}

export default ToggleButton
