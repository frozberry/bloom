import ReactPlayer from "react-player/wistia"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

const VideoPlayer = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          position: "relative",
          pt: "56.25%",
        }}
      >
        <ReactPlayer
          url="https://swiftbadminton.wistia.com/medias/v37i7ucb0f"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          width="100%"
          height="100%"
          pip={true}
          volume={0.5}
          config={{
            options: {
              // playbar: true,
              resumable: true,
              fullscreenButton: true,
              volumeControl: true,
              // autoPlay: true,
              googleAnalytics: true,
            },
          }}
        />
      </Box>
    </Container>
  )
}

export default VideoPlayer
