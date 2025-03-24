import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          const parsedUser = JSON.parse(userData)
          if (parsedUser.isLoggedIn) {
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  
  const logout = () => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsedUser,
            isLoggedIn: false,
          }),
        )
      }
      setUser(null)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  // Login function
  const login = (userData) => {
    try {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          isLoggedIn: true,
        }),
      )
      setUser({ ...userData, isLoggedIn: true })
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

