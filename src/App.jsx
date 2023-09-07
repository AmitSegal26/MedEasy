import "./App.css";
import Router from "./routes/Router";
import Navbar from "./components/Navbar/Navbar";
import COLORS from "./colors/COLORS";
import Footer from "./components/Footer";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoggedIn from "./hooks/useLoggedIn";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinalLoading, setIsFinalLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      try {
        await loggedIn();
        await axios.get("http://localhost:8181/");
        setIsLoading(false);
      } catch (err) {
        toast.error(
          "Network is having problems, some of the performace of the website may be affected!"
        );
        setIsLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    setIsFinalLoading(isLoading);
  }, [isLoading]);
  return (
    <div className="App" style={{ backgroundColor: COLORS.BACKGROUND }}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        transition={Slide}
        theme="dark"
      />
      <header className="App-header">
        <Navbar />
      </header>
      <main
        style={{
          marginTop: "7rem",
          minHeight: "78.5vh",
        }}
      >
        {isFinalLoading ? <CircularProgress /> : <Router />}
      </main>
      <footer style={{ marginTop: "2rem" }}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
