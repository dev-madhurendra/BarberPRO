import type React from "react"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { getCurrentUser } from "../../../api/auth"
import OAuthLoader from "../../../components/atoms/Loader"
import { theme } from "../../../styles/theme"
import ConnectionIndicator from "../../../components/atoms/ConnectionIndicator"
import Typography from "../../../components/atoms/Typography"
import Button from "../../../components/atoms/Button"
import Card from "../../../components/atoms/Card"
import { useRealtimeQueueSimple } from "../../../hooks/use-realtime-queue-simple"
import Notification from "../../../components/atoms/Notification"

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const DashboardContainer = styled.div`
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.background}f5 100%);
  min-height: 100vh;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${theme.colors.primary}15;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`

const HeaderContent = styled.div`
  flex: 1;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const StatusCard = styled(Card)`
  position: relative;
  background: linear-gradient(135deg, ${theme.colors.primary}08 0%, ${theme.colors.primary}15 100%);
  border: 2px solid ${theme.colors.primary}25;
  border-left: 6px solid ${theme.colors.primary};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, ${theme.colors.primary}10, transparent);
    border-radius: 50%;
    transform: translate(30px, -30px);
  }
`

const StatusBadge = styled.div<{ status: string }>`
  background: ${props => 
    props.status === "available" ? `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.success}dd 100%)` :
    props.status === "busy" ? `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondary}dd 100%)` :
    `linear-gradient(135deg, ${theme.colors.textSecondary} 0%, ${theme.colors.textSecondary}dd 100%)`
  };
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px ${props => 
    props.status === "available" ? `${theme.colors.success}40` :
    props.status === "busy" ? `${theme.colors.secondary}40` :
    `${theme.colors.textSecondary}40`
  };
  position: relative;
  z-index: 1;
  text-transform: capitalize;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.primary}15;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${theme.colors.primary}15;
    border-color: ${theme.colors.primary}30;
  }
`

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.success};
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 0 10px ${theme.colors.success}60;
`

const QueueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.primary}10;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 20px ${theme.colors.primary}15;
    border-color: ${theme.colors.primary}25;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`

const CustomerInfo = styled.div`
  flex: 1;
`

const QueueActions = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-width: auto;
`

const CompactCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.primary}05 100%);
  border: 1px solid ${theme.colors.primary}15;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}30;
    box-shadow: 0 8px 25px ${theme.colors.primary}10;
  }
`

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const QuickActionCard = styled(Card)`
  text-align: center;
  border: 2px solid ${theme.colors.primary}20;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.primary}50;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${theme.colors.primary}20;
  }
`

const EarningsCard = styled(CompactCard)`
  background: linear-gradient(135deg, ${theme.colors.success}08 0%, ${theme.colors.success}15 100%);
  border-color: ${theme.colors.success}25;
`

const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.primary}10;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 4px 15px ${theme.colors.primary}10;
    border-color: ${theme.colors.primary}20;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`

const TimeSlotBadge = styled.div`
  background: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.75rem;
  font-weight: 600;
`

export const BarberDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [barberStatus, setBarberStatus] = useState("available")
  const [currentCustomer, setCurrentCustomer] = useState<any>(null)
  const [todayAppointments, setTodayAppointments] = useState<any[]>([])
  const [earnings, setEarnings] = useState({ today: 145, week: 720, month: 2850 })

  const { queueData, barbers, isConnected, notifications, reconnect, clearNotifications } =
    useRealtimeQueueSimple("barber-456")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.href = "/"
  }

  const handleStatusChange = (status: string) => {
    setBarberStatus(status)
    // API call to update status would go here
  }

  const handleNextCustomer = () => {
    // Logic to call next customer
    console.log("Calling next customer")
  }

  const handleCompleteService = () => {
    // Logic to complete current service
    console.log("Completing service")
    setCurrentCustomer(null)
  }

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.log("No token found")
          return
        }

        const response = await getCurrentUser()
        setUser(response.data)

        if (response.data.role === "BARBER") {
          // Mock current customer
          setCurrentCustomer({
            name: "John Smith",
            service: "md Service",
            tokenNumber: "A-042",
            startTime: "2:15 PM",
            estimatedDuration: "35 min"
          })

          // Mock today's appointments
          setTodayAppointments([
            {
              time: "9:00 AM",
              customer: "Alice Johnson",
              service: "Quick Cut",
              status: "completed",
              duration: "20 min"
            },
            {
              time: "10:30 AM",
              customer: "Bob Wilson",
              service: "md Service",
              status: "completed",
              duration: "45 min"
            },
            {
              time: "3:00 PM",
              customer: "Carol Davis",
              service: "Quick Cut",
              status: "upcoming",
              duration: "15 min"
            },
            {
              time: "4:15 PM",
              customer: "David Brown",
              service: "md Service",
              status: "upcoming",
              duration: "40 min"
            }
          ])
        }
      } catch (err) {
        console.error(err)
        handleLogout()
      } finally {
        setLoading(false)
      }
    }

    fetchBarberData()
  }, [])

  if (loading) return <OAuthLoader />

  return (
    <DashboardContainer>
      {notifications.map((notification, index) => (
        <Notification key={index} message={notification} onClose={() => clearNotifications()} />
      ))}

      <Header>
        <HeaderContent>
          <Typography 
            text={`Welcome, ${user?.data.name}`} 
            variant="xxl" 
            weight="bold" 
            color={theme.colors.primary} 
          />
          <Typography
            text="Manage your queue, appointments, and track your earnings"
            variant="md"
            color={theme.colors.textSecondary}
            style={{ marginTop: "0.75rem", lineHeight: "1.6" }}
          />
        </HeaderContent>
        <HeaderActions>
          <ConnectionIndicator
            status={queueData.connectionStatus}
            lastUpdated={queueData.lastUpdated}
            onReconnect={reconnect}
          />
          <Button text="Logout" buttonVariant="outline" onClick={handleLogout} />
        </HeaderActions>
      </Header>

      <MainGrid>
        <LeftColumn>
          {/* Barber Status & Current Customer */}
          <StatusCard>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "1.5rem",
              position: "relative",
              zIndex: 1
            }}>
              <Typography text="Your Status" variant="lg" weight="bold" />
              <StatusBadge status={barberStatus}>
                {barberStatus}
              </StatusBadge>
            </div>

            {currentCustomer ? (
              <>
                <div style={{ marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
                  <Typography text="Current Customer" variant="md" weight="bold" style={{ marginBottom: "0.75rem" }} />
                  <div style={{ 
                    background: theme.colors.background, 
                    padding: "1rem", 
                    borderRadius: theme.borderRadius.lg,
                    border: `1px solid ${theme.colors.primary}20`
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <Typography text={currentCustomer.name} variant="md" weight="bold" />
                      <Typography text={`Token: ${currentCustomer.tokenNumber}`} variant="sm" color={theme.colors.primary} weight="bold" />
                    </div>
                    <Typography text={currentCustomer.service} variant="sm" color={theme.colors.textSecondary} />
                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
                      <Typography text={`Started: ${currentCustomer.startTime}`} variant="xs" color={theme.colors.textSecondary} />
                      <Typography text={`Duration: ${currentCustomer.estimatedDuration}`} variant="xs" color={theme.colors.textSecondary} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", position: "relative", zIndex: 1 }}>
                  <Button text="Complete Service" onClick={handleCompleteService} style={{ flex: 1 }} />
                  <Button text="Extend Time" buttonVariant="outline" style={{ flex: 1 }} />
                </div>
              </>
            ) : (
              <>
                <Typography text="No active customer" variant="md" color={theme.colors.textSecondary} style={{ marginBottom: "1.5rem", position: "relative", zIndex: 1 }} />
                <Button text="Call Next Customer" onClick={handleNextCustomer} style={{ width: "100%", position: "relative", zIndex: 1 }} />
              </>
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", position: "relative", zIndex: 1 }}>
              <ActionButton 
                text="Available" 
                buttonVariant={barberStatus === "available" ? "primary" : "outline"}
                onClick={() => handleStatusChange("available")}
              />
              <ActionButton 
                text="On Break" 
                buttonVariant={barberStatus === "break" ? "primary" : "outline"}
                onClick={() => handleStatusChange("break")}
              />
              <ActionButton 
                text="Busy" 
                buttonVariant={barberStatus === "busy" ? "primary" : "outline"}
                onClick={() => handleStatusChange("busy")}
              />
            </div>
          </StatusCard>

          {/* Queue Management */}
          <CompactCard>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <Typography text="Your Queue" variant="lg" weight="bold" />
              {isConnected && <LiveIndicator />}
              <Typography text={`${queueData.totalInQueue} waiting`} variant="sm" color={theme.colors.primary} weight="bold" />
            </div>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {Array.from({ length: Math.min(queueData.totalInQueue, 5) }, (_, index) => (
                <QueueItem key={index}>
                  <CustomerInfo>
                    <Typography text={`Customer #${index + 1}`} variant="md" weight="medium" />
                    <Typography text={`Token: A-${(43 + index).toString().padStart(3, '0')}`} variant="sm" color={theme.colors.primary} />
                    <Typography text="Quick Cut • ~15 min wait" variant="sm" color={theme.colors.textSecondary} />
                  </CustomerInfo>
                  <QueueActions>
                    <ActionButton text="Call" buttonVariant="primary" />
                    <ActionButton text="Skip" buttonVariant="outline" />
                  </QueueActions>
                </QueueItem>
              ))}
              
              {queueData.totalInQueue === 0 && (
                <Typography text="No customers in queue" variant="sm" color={theme.colors.textSecondary} style={{ textAlign: "center", padding: "2rem" }} />
              )}
            </div>
          </CompactCard>

          {/* Quick Actions */}
          <CompactCard>
            <Typography text="Quick Actions" variant="lg" weight="bold" style={{ marginBottom: "1.5rem" }} />
            <QuickActions>
              <QuickActionCard>
                <div style={{ padding: "1rem" }}>
                  <Typography text="📞" variant="xl" style={{ marginBottom: "0.5rem" }} />
                  <Typography text="Call Next" variant="sm" weight="bold" />
                </div>
              </QuickActionCard>
              <QuickActionCard>
                <div style={{ padding: "1rem" }}>
                  <Typography text="⏸️" variant="xl" style={{ marginBottom: "0.5rem" }} />
                  <Typography text="Take Break" variant="sm" weight="bold" />
                </div>
              </QuickActionCard>
            </QuickActions>
          </CompactCard>
        </LeftColumn>

        <RightColumn>
          {/* Earnings */}
          <EarningsCard>
            <Typography text="Today's Earnings" variant="lg" weight="bold" style={{ marginBottom: "1.5rem" }} />
            <StatsGrid>
              <StatItem>
                <Typography text={`$${earnings.today}`} variant="xl" weight="bold" color={theme.colors.success} />
                <Typography text="Today" variant="sm" color={theme.colors.textSecondary} />
              </StatItem>
              <StatItem>
                <Typography text={`$${earnings.week}`} variant="xl" weight="bold" color={theme.colors.success} />
                <Typography text="This Week" variant="sm" color={theme.colors.textSecondary} />
              </StatItem>
              <StatItem>
                <Typography text={`$${earnings.month}`} variant="xl" weight="bold" color={theme.colors.success} />
                <Typography text="This Month" variant="sm" color={theme.colors.textSecondary} />
              </StatItem>
            </StatsGrid>
          </EarningsCard>

          {/* Today's Appointments */}
          <CompactCard>
            <Typography text="Today's Schedule" variant="lg" weight="bold" style={{ marginBottom: "1.5rem" }} />
            <div>
              {todayAppointments.map((appointment, index) => (
                <AppointmentItem key={index}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                      <TimeSlotBadge>{appointment.time}</TimeSlotBadge>
                      <Typography text={appointment.customer} variant="sm" weight="bold" />
                    </div>
                    <Typography text={`${appointment.service} • ${appointment.duration}`} variant="xs" color={theme.colors.textSecondary} />
                  </div>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: appointment.status === "completed" ? theme.colors.success : 
                                   appointment.status === "upcoming" ? theme.colors.primary : 
                                   theme.colors.secondary
                  }} />
                </AppointmentItem>
              ))}
            </div>
          </CompactCard>

          {/* Performance Stats */}
          <CompactCard>
            <Typography text="Performance Stats" variant="lg" weight="bold" style={{ marginBottom: "1.5rem" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Customers served today" variant="sm" color={theme.colors.textSecondary} />
                <Typography text="12" variant="sm" weight="medium" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Average service time" variant="sm" color={theme.colors.textSecondary} />
                <Typography text="28 min" variant="sm" weight="medium" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Customer rating" variant="sm" color={theme.colors.textSecondary} />
                <Typography text="4.8 ⭐" variant="sm" weight="medium" color={theme.colors.primary} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Tips received" variant="sm" color={theme.colors.textSecondary} />
                <Typography text="$45" variant="sm" weight="medium" color={theme.colors.success} />
              </div>
            </div>
          </CompactCard>

          {/* Shop Stats */}
          <CompactCard>
            <Typography text="Shop Overview" variant="lg" weight="bold" style={{ marginBottom: "1.5rem" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Total customers in shop" variant="sm" color={theme.colors.textSecondary} />
                <Typography text={`${queueData.totalInQueue + 3}`} variant="sm" weight="medium" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Active barbers" variant="sm" color={theme.colors.textSecondary} />
                <Typography text={`${queueData.availableBarbers}`} variant="sm" weight="medium" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Average wait time" variant="sm" color={theme.colors.textSecondary} />
                <Typography text={`${queueData.averageWait} min`} variant="sm" weight="medium" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography text="Shop occupancy" variant="sm" color={theme.colors.textSecondary} />
                <Typography text="85%" variant="sm" weight="medium" color={theme.colors.primary} />
              </div>
            </div>
          </CompactCard>
        </RightColumn>
      </MainGrid>
    </DashboardContainer>
  )
}
