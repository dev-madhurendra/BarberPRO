import type React from "react"
import { theme } from "../../../styles/theme"
import Typography from "../Typography"

interface ConnectionIndicatorProps {
  status: "connected" | "connecting" | "disconnected"
  lastUpdated: Date
  onReconnect?: () => void
}

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status, lastUpdated, onReconnect }) => {
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return theme.colors.success
      case "connecting":
        return theme.colors.highlight
      case "disconnected":
        return theme.colors.error
      default:
        return theme.colors.textSecondary
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Connected"
      case "connecting":
        return "Connecting..."
      case "disconnected":
        return "Disconnected"
      default:
        return "Unknown"
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        backgroundColor: status === "connected" ? `${theme.colors.success}10` : `${getStatusColor()}10`,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${getStatusColor()}30`,
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: getStatusColor(),
          animation: status === "connecting" ? "pulse 1.5s infinite" : "none",
        }}
      />
      <Typography text={getStatusText()} variant="xs" color={getStatusColor()} />
      <Typography text={`• ${lastUpdated.toLocaleTimeString()}`} variant="xs" color={theme.colors.textSecondary} />
      {status === "disconnected" && onReconnect && (
        <button
          onClick={onReconnect}
          style={{
            background: "none",
            border: "none",
            color: theme.colors.primary,
            cursor: "pointer",
            fontSize: "0.75rem",
            textDecoration: "underline",
          }}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ConnectionIndicator
