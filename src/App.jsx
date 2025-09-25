import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import WelcomePage from "./Webpage";


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Webpage" element={<WelcomePage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;