import { Button, Container } from "@mui/material"

const ToggleButton = ({ view, setView }: any) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
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
