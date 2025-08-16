import { useState, useEffect } from "react"

interface QueueData {
  tokenNumber: string
  position: number
  estimatedWait: number
  barberName: string
  service: string
  totalInQueue: number
  averageWait: number
  availableBarbers: number
  connectionStatus: "connected" | "connecting" | "disconnected"
  lastUpdated: Date
}

interface Barber {
  id: string
  name: string
  status: "available" | "busy" | "break"
  queueLength: number
  estimatedFinishTime?: string
}

export const useRealtimeQueueSimple = (userId: string) => {
  const [queueData, setQueueData] = useState<QueueData>({
    tokenNumber: "T-042",
    position: 3,
    estimatedWait: 25,
    barberName: "Mike Johnson",
    service: "Full Service",
    totalInQueue: 12,
    averageWait: 18,
    availableBarbers: 3,
    connectionStatus: "connected",
    lastUpdated: new Date(),
  })

  const [barbers, setBarbers] = useState<Barber[]>([
    { id: "1", name: "Mike Johnson", status: "busy", queueLength: 4, estimatedFinishTime: "15 min" },
    { id: "2", name: "Sarah Wilson", status: "available", queueLength: 2 },
    { id: "3", name: "Alex Chen", status: "busy", queueLength: 6, estimatedFinishTime: "8 min" },
  ])

  const [isConnected, setIsConnected] = useState(true)
  const [notifications, setNotifications] = useState<string[]>([])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData((prev) => {
        const newPosition = Math.max(1, prev.position + (Math.random() > 0.7 ? -1 : 0))
        const positionChanged = newPosition !== prev.position

        if (positionChanged && newPosition < prev.position) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            `You moved up! Now ${newPosition} ${newPosition === 1 ? "person" : "people"} ahead of you.`,
          ])
        }

        return {
          ...prev,
          position: newPosition,
          estimatedWait: Math.max(5, newPosition * 8 + Math.floor(Math.random() * 10) - 5),
          totalInQueue: Math.max(8, prev.totalInQueue + Math.floor(Math.random() * 3) - 1),
          averageWait: Math.max(10, prev.averageWait + Math.floor(Math.random() * 6) - 3),
          lastUpdated: new Date(),
        }
      })

      // Simulate barber status changes
      setBarbers((prev) =>
        prev.map((barber) => ({
          ...barber,
          queueLength: Math.max(0, barber.queueLength + Math.floor(Math.random() * 3) - 1),
          status: Math.random() > 0.9 ? (barber.status === "available" ? "busy" : "available") : barber.status,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Simulate connection status
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsConnected(false)
        setQueueData((prev) => ({ ...prev, connectionStatus: "disconnected" }))

        setTimeout(() => {
          setIsConnected(true)
          setQueueData((prev) => ({ ...prev, connectionStatus: "connected" }))
        }, 2000)
      }
    }, 10000)

    return () => clearInterval(connectionInterval)
  }, [])

  const reconnect = () => {
    setQueueData((prev) => ({ ...prev, connectionStatus: "connecting" }))
    setTimeout(() => {
      setIsConnected(true)
      setQueueData((prev) => ({ ...prev, connectionStatus: "connected" }))
    }, 1000)
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return {
    queueData,
    barbers,
    isConnected,
    notifications,
    reconnect,
    clearNotifications,
  }
}
