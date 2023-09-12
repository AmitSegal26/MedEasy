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
    //
    document.addEventListener("mousemove", checkUserInactivity);
    document.addEventListener("keydown", checkUserInactivity);
    document.addEventListener("wheel", checkUserInactivity);

    // Initialize the timer when the component mounts
    checkUserInactivity();

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousemove", checkUserInactivity);
      document.removeEventListener("keydown", checkUserInactivity);
      document.removeEventListener("wheel", checkUserInactivity);
    };
  }, []);
  useEffect(() => {
    setIsFinalLoading(isLoading);
  }, [isLoading]);
  let inactivityTimer; // This will store the timer ID
  const hours = 4; // Replace with your desired number of hours
  const milliseconds = hours * 60 * 60 * 1000;

  const checkUserInactivity = async () => {
    if (await loggedIn()) {
      // Clear the previous timer, if any
      clearTimeout(inactivityTimer);

      // Set a new timer for 4 seconds
      inactivityTimer = setTimeout(() => {
        // User has been inactive for 4 seconds, so trigger your action here
        // For example, you can display a message or perform some other task
        toast.warning("You've been logged out due to inactivity", {
          autoClose: false,
        });
        navigate(ROUTES.LOGOUT);
      }, 2000); // 4 hours in milliseconds
    }
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
