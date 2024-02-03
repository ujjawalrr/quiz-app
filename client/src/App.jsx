import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"
import SpecialRoute from "./components/SpecialRoute"
import Quiz from "./pages/Quiz"
import Dashboard from "./pages/Dashboard"
import { ToastContainer } from "react-toastify"
import ResetPassword from "./pages/ResetPassword"
import Solutions from "./pages/Solutions"
import Test from "./pages/Test"
import MatchTheFollowing from "./components/MatchTheColumns1"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      {/* <Header /> */}
      <Routes>
        <Route element={<SpecialRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/quiz" element={<Quiz />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/test" element={<Test />} />
        <Route path="/match" element={<MatchTheFollowing />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
