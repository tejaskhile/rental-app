import "./App.css";
import Navbar from "./comps/Navbar";
import Footer from "./comps/Footer";
import Home from "./pages/Home";
import Login from "./comps/Login";
import { useContext } from "react";
import { UserContext, UserProvider } from "./context/userContext";

function AppContent() {
  const { showLogin } = useContext(UserContext);
  return (
    <div className="app">
      <Navbar />
      {showLogin && <Login />}
      <Home />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
