import type React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getCurrentUser } from '../../../api/auth';
import OAuthLoader from '../../../components/atoms/Loader';
import { theme } from '../../../styles/theme';
import ConnectionIndicator from '../../../components/atoms/ConnectionIndicator';
import Typography from '../../../components/atoms/Typography';
import Button from '../../../components/atoms/Button';
import Card from '../../../components/atoms/Card';
import { useRealtimeQueueSimple } from '../../../hooks/use-realtime-queue-simple';
import Notification from '../../../components/atoms/Notification';
import useAuthStore from '../../../store/AuthStore';

// Styled Components
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
`;

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
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ActiveTokenCard = styled(Card)`
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
`;

const TokenBadge = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primary}dd 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px ${theme.colors.primary}40;
  position: relative;
  z-index: 1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

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
`;

const LiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.success};
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 0 10px ${theme.colors.success}60;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  border: 2px solid ${theme.colors.primary}20;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.primary}50;
    transform: translateY(-4px);
    box-shadow: 0 12px 30px ${theme.colors.primary}20;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${theme.colors.primary}10, transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ServiceIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.primary}30);
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  ${ServiceCard}:hover & {
    transform: scale(1.1);
    background: linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.primary}60);
  }
`;

const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.primary}10;
  transition: all 0.3s ease;

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
`;

const StatusBadge = styled.div<{ status: string }>`
  background: ${(props) =>
    props.status === 'Completed'
      ? theme.colors.success
      : props.status === 'Upcoming'
        ? theme.colors.primary
        : theme.colors.secondary};
  color: white;
  padding: 0.375rem 0.875rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SidebarCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.primary}05 100%);
  border: 1px solid ${theme.colors.primary}15;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}30;
    box-shadow: 0 8px 25px ${theme.colors.primary}10;
  }
`;

const BarberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${theme.colors.primary}10;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.colors.primary}08;
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: ${theme.borderRadius.md};
  }
`;

const BarberStatus = styled.div<{ status: string }>`
  background: ${(props) =>
    props.status === 'available'
      ? theme.colors.success
      : props.status === 'busy'
        ? theme.colors.secondary
        : theme.colors.textSecondary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CancelButton = styled(Button)`
  background: linear-gradient(135deg, ${theme.colors.textSecondary} 0%, ${theme.colors.textSecondary}dd 100%);
  color: white;
  border: none;
  
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.textSecondary}dd 0%, ${theme.colors.textSecondary}bb 100%);
    transform: translateY(-1px);
  }
`;

export const CustomerDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const { token } = useAuthStore();

  const {
    queueData,
    barbers,
    isConnected,
    notifications,
    reconnect,
    clearNotifications,
  } = useRealtimeQueueSimple('user-123');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await getCurrentUser();
        setUser(response.data);

        if (response.data.role === 'CUSTOMER') {
          setAppointments([
            {
              barberName: 'Mike Johnson',
              date: '2025-01-20',
              time: '11:00 AM',
              service: 'Full Service',
              status: 'Upcoming',
            },
            {
              barberName: 'Sarah Wilson',
              date: '2025-01-15',
              time: '3:30 PM',
              service: 'Quick Cut',
              status: 'Completed',
            },
          ]);
        }
      } catch (err) {
        console.error(err);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <OAuthLoader />;

  return (
    <DashboardContainer>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          message={notification}
          onClose={() => clearNotifications()}
        />
      ))}

      <Header>
        <HeaderContent>
          <Typography
            text={`Welcome back, ${user?.data.name}`}
            variant="xxl"
            weight="bold"
            color={theme.colors.primary}
          />
          <Typography
            text="Manage your appointments and track your queue position in real-time"
            variant="md"
            color={theme.colors.textSecondary}
            style={{ marginTop: '0.75rem', lineHeight: '1.6' }}
          />
        </HeaderContent>
        <HeaderActions>
          <ConnectionIndicator
            status={queueData.connectionStatus}
            lastUpdated={queueData.lastUpdated}
            onReconnect={reconnect}
          />
          <Button
            text="Logout"
            buttonVariant="outline"
            onClick={handleLogout}
          />
        </HeaderActions>
      </Header>

      <MainGrid>
        <MainContent>
          {/* Active Token */}
          <ActiveTokenCard>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Typography text="Your Active Token" variant="lg" weight="bold" />
              <TokenBadge>Token #{queueData.tokenNumber}</TokenBadge>
            </div>

            <StatsGrid>
              <StatItem>
                <Typography
                  text={`${queueData.position}`}
                  variant="xl"
                  weight="bold"
                  color={theme.colors.primary}
                />
                <Typography
                  text="People ahead"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                {isConnected && (
                  <LiveIndicator style={{ margin: '0.5rem auto 0' }} />
                )}
              </StatItem>
              <StatItem>
                <Typography
                  text={`~${queueData.estimatedWait}`}
                  variant="xl"
                  weight="bold"
                  color={theme.colors.primary}
                />
                <Typography
                  text="Minutes wait"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
              </StatItem>
              <StatItem>
                <Typography
                  text={queueData.barberName.split(' ')[0]}
                  variant="xl"
                  weight="bold"
                  color={theme.colors.primary}
                />
                <Typography
                  text="Your barber"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
              </StatItem>
            </StatsGrid>

            <ActionButtons>
              <Button
                text="View Details"
                buttonVariant="outline"
                style={{ flex: 1 }}
              />
              <CancelButton text="Cancel Token" style={{ flex: 1 }} />
            </ActionButtons>
          </ActiveTokenCard>

          {/* Book New Token */}
          <Card>
            <Typography
              text="Book a New Token"
              variant="lg"
              weight="bold"
              style={{ marginBottom: '0.75rem' }}
            />
            <Typography
              text="Reserve your spot and avoid the wait with our premium booking system"
              variant="md"
              color={theme.colors.textSecondary}
              style={{ marginBottom: '2rem', lineHeight: '1.6' }}
            />

            <ServiceGrid>
              <ServiceCard>
                <ServiceIcon>✂</ServiceIcon>
                <Typography
                  text="Quick Cut"
                  variant="md"
                  weight="bold"
                  style={{ marginBottom: '0.5rem' }}
                />
                <Typography
                  text="15-20 minutes"
                  variant="sm"
                  color={theme.colors.textSecondary}
                  style={{ marginBottom: '1.5rem' }}
                />
                <Button text="Book Token - $25" style={{ width: '100%' }} />
              </ServiceCard>

              <ServiceCard>
                <ServiceIcon>👤</ServiceIcon>
                <Typography
                  text="Full Service"
                  variant="md"
                  weight="bold"
                  style={{ marginBottom: '0.5rem' }}
                />
                <Typography
                  text="30-45 minutes"
                  variant="sm"
                  color={theme.colors.textSecondary}
                  style={{ marginBottom: '1.5rem' }}
                />
                <Button text="Book Token - $45" style={{ width: '100%' }} />
              </ServiceCard>
            </ServiceGrid>
          </Card>

          {/* Appointments History */}
          <Card>
            <Typography
              text="Your Appointments"
              variant="lg"
              weight="bold"
              style={{ marginBottom: '1.5rem' }}
            />
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <AppointmentItem key={index}>
                    <div>
                      <Typography
                        text={appt.service}
                        variant="md"
                        weight="medium"
                      />
                      <Typography
                        text={`${appt.barberName} • ${appt.date} at ${appt.time}`}
                        variant="sm"
                        color={theme.colors.textSecondary}
                        style={{ marginTop: '0.25rem' }}
                      />
                    </div>
                    <StatusBadge status={appt.status}>
                      {appt.status}
                    </StatusBadge>
                  </AppointmentItem>
                ))
              ) : (
                <Typography
                  text="No appointments found."
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
              )}
            </div>
          </Card>
        </MainContent>

        <Sidebar>
          {/* Live Queue Status */}
          <SidebarCard>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <Typography text="Live Queue Status" variant="lg" weight="bold" />
              {isConnected && <LiveIndicator />}
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  text="Total in queue"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                <Typography
                  text={`${queueData.totalInQueue} people`}
                  variant="sm"
                  weight="medium"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  text="Average wait"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                <Typography
                  text={`${queueData.averageWait} minutes`}
                  variant="sm"
                  weight="medium"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  text="Available barbers"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                <Typography
                  text={`${queueData.availableBarbers} active`}
                  variant="sm"
                  weight="medium"
                  color={theme.colors.primary}
                />
              </div>
            </div>
          </SidebarCard>

          {/* Barber Availability */}
          <SidebarCard>
            <Typography
              text="Available Barbers"
              variant="lg"
              weight="bold"
              style={{ marginBottom: '1.5rem' }}
            />
            <div>
              {barbers.map((barber) => (
                <BarberItem key={barber.id}>
                  <div>
                    <Typography
                      text={barber.name}
                      variant="sm"
                      weight="medium"
                    />
                    <Typography
                      text={`${barber.queueLength} in queue${barber.estimatedFinishTime ? ` • ${barber.estimatedFinishTime} left` : ''}`}
                      variant="xs"
                      color={theme.colors.textSecondary}
                      style={{ marginTop: '0.25rem' }}
                    />
                  </div>
                  <BarberStatus status={barber.status}>
                    {barber.status}
                  </BarberStatus>
                </BarberItem>
              ))}
            </div>
          </SidebarCard>

          {/* Your Stats */}
          <SidebarCard>
            <Typography
              text="Your Stats"
              variant="lg"
              weight="bold"
              style={{ marginBottom: '1.5rem' }}
            />
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  text="Total visits"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                <Typography text="24" variant="sm" weight="medium" />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  text="Favorite barber"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                <Typography text="Mike J." variant="sm" weight="medium" />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  text="Member since"
                  variant="sm"
                  color={theme.colors.textSecondary}
                />
                <Typography text="Jan 2023" variant="sm" weight="medium" />
              </div>
            </div>
          </SidebarCard>
        </Sidebar>
      </MainGrid>
    </DashboardContainer>
  );
};
