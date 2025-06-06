import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { setUser } from "./state/authSlice"
import type { AppDispatch } from "./state/store"
import type { User } from "./types/UserType"

import Layout from "./components/Layout"
import LoadingScreen from "./components/LoadingScreen"
import RedirectToDashboardIfLoggedIn from "./components/RedirectToDashboardIfLoggedIn"
import Book from "./pages/Booking"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/protectedRoute"

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")

    if (token && user) {
      try {
        const parsedUser: User = JSON.parse(user);
        dispatch(setUser({ user: parsedUser, token }))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setIsHydrated(true);
  }, [dispatch]);

  if (!isHydrated) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<RedirectToDashboardIfLoggedIn />} />
          <Route path="/book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
