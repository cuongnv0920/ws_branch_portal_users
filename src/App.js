import { Divider, Grid, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { ExchangeRate, Header, MenuAppbar } from "./components/common";
import Home from "./features/Home";

function App() {
  const routes = [
    {
      path: "/*",
      element: <Home />,
      role: "user",
    },
  ];

  return (
    <div className="App">
      <Header />
      <Divider />
      <MenuAppbar />
      <Box className="main">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={7} md={7}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Grid>
            <Grid item xs={5} md={5}>
              <Paper>
                <ExchangeRate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
