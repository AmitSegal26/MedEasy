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
//css
import "./App.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "./routes/ROUTES";

function App() {
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const [isLoading, setIsLoading] = useState(true);
  const [isFinalLoading, setIsFinalLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        await axios.get("http://localhost:8181/");
        await loggedIn();
        //!BONUS - LOG OUT A USER AFTER $ HOURS OF INACTIVITY
        //!BONUS - bonus no. 1
        document.addEventListener("wheel", checkUserInactivity);
        document.addEventListener("click", checkUserInactivity);

        checkUserInactivity();
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
  let inactivityTimer; // This will store the timer ID
  const hours = 4;
  const milliseconds = hours * 60 * 60 * 1000;

  const checkUserInactivity = async () => {
    try {
      if (await loggedIn()) {
        // Clear the previous timer, if any
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          // User has been inactive for 4 hours, so trigger your action here
          toast.warning(
            "You've been logged out due to inactivity (click to hide)",
            {
              autoClose: false,
            }
          );
          navigate(ROUTES.LOGOUT);
        }, milliseconds); // 4 hours in milliseconds
      }
    } catch (error) {}
  };

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
        id="main"
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
