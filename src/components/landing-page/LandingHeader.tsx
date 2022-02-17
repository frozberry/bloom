import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Image from "next/image"

const LandingHeader = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        p: 0,
        m: 0,
        backgroundColor: "lightBlue.main",
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h3"
              sx={{
                // color: "red",
                letterSpacing: 3,
                mb: 4,
                fontSize: 30,
                color: "blue",
              }}
            >
              <b>Secure your child&apos;s grammar school future</b>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: 20, mb: 3, color: "#121D1E", lineHeight: 1.5 }}
            >
              Only 1 in 10 children who take the 11+ get accepted to grammar
              schools. See how your child ranks against the competition.
            </Typography>
            <Button
              variant="contained"
              sx={{
                color: "white",
                py: 3,
                px: 10,
                textTransform: "none",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Get started today
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "1rem",
                    color: "white",
                    mb: 0,
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  Try Waterfront free for 14-days
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                width: "75%",
                ml: 5,
              }}
            >
              <Image
                src="/boy.png"
                alt="Waterfront logo"
                layout="responsive"
                width={512}
                height={512}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default LandingHeader
