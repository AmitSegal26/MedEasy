import "./App.css";
import Router from "./routes/Router";
import Navbar from "./components/Navbar/Navbar";
import COLORS from "./colors/COLORS";
import Footer from "./pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoggedIn from "./hooks/useLoggedIn";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: COLORS.BACKGROUND }}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <header className="App-header">
        <Navbar />
      </header>
      <main style={{ marginTop: "7rem", minHeight: "78.5vh" }}>
        {isLoading ? <CircularProgress /> : <Router />}
      </main>
      <footer style={{ marginTop: "2rem" }}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
