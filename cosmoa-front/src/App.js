import { createTheme, ThemeProvider } from "@material-ui/core";
import "./App.css";
import AppRouter from "./AppRouter";
import "./font.css";

const theme = createTheme({
  typography: {
    fontFamily: "neoRegular",
  },
});

function App() {
  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
