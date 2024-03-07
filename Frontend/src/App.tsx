import Header from "./components/Header"
import Home from "./Pages/home"
import SignUp from "./Pages/signup"
import Login from "./Pages/login"
import Chat from "./Pages/chat"
import NotFound from "./Pages/notfound"
import { Routes, Route } from 'react-router-dom'
import { useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {auth?.isLoggedIn && auth.user &&
          <Route path="/chat" element={<Chat />} />
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
