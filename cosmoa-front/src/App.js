import { createTheme, ThemeProvider } from "@material-ui/core";
import "./App.css";
import AppRouter from "./AppRouter";


const theme = createTheme({
  typography: {
    "font-family": "NanumSquareNeoLight",
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
