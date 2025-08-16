import type React from "react"
import { useEffect, useState } from "react"
import { theme } from "../../../styles/theme"
import Typography from "../Typography"

interface NotificationProps {
  message: string
  onClose: () => void
  duration?: number
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        backgroundColor: theme.colors.primary,
        color: "white",
        padding: "1rem",
        borderRadius: theme.borderRadius.lg,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        maxWidth: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        animation: isVisible ? "slideIn 0.3s ease-out" : "slideOut 0.3s ease-in",
      }}
    >
      <Typography text={message} variant="sm" color="white" />
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "1.2rem",
          padding: "0",
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}

export default Notification
