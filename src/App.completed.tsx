/**
 * COMPLETED VERSION - All widgets integrated
 * 
 * This file shows the final result after completing all 4 steps.
 * You can replace App.tsx with this file to skip the lab.
 */

import React, { useState } from 'react';
import {
  StationLogin,
  UserState,
  TaskList,
  CallControl,
  store,
} from '@webex/cc-widgets';
import {
  ThemeProvider,
  IconProvider,
} from '@momentum-design/components/dist/react';
import './App.css';

type Task = any;

function App() {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const webexConfig = {
    fedramp: false,
    logger: { level: 'info' },
    cc: { allowMultiLogin: true },
  };

  const initializeWidgets = async () => {
    if (!accessToken.trim()) {
      alert('Please enter your access token first!');
      return;
    }

    setIsLoading(true);

    try {
      await store.init({ webexConfig, access_token: accessToken });
      setIsSdkReady(true);
      console.log('Widgets initialized successfully!');
    } catch (error) {
      console.error('Failed to initialize widgets:', error);
      alert('Failed to initialize widgets. Please check your access token.');
    } finally {
      setIsLoading(false);
    }
  };

  // Station Logout function
  const handleStationLogout = () => {
    store.cc
      .stationLogout({ logoutReason: 'User requested logout' })
      .then((response: any) => {
        if ('data' in response) {
          console.log('Agent logged out successfully', response.data);
          setIsLoggedIn(false);
          setSelectedTask(null);
        }
      })
      .catch((error: any) => {
        console.error('Agent logout failed', error);
      });
  };

  return (
    <div className="crm-app">
      <ThemeProvider themeclass="mds-theme-stable-lightWebex">
        <IconProvider iconSet="momentum-icons">

          {/* CRM HEADER */}
          <header className="crm-header">
            <div className="logo">
              CRM<span>Pro</span>
            </div>
            <div className="header-right">
              <input
                type="text"
                className="search-bar"
                placeholder="Search customers, deals..."
              />
              {isLoggedIn && (
                <button className="btn-logout" onClick={handleStationLogout}>
                  🚪 Logout
                </button>
              )}
              <div className="user-avatar">JD</div>
            </div>
          </header>

          <div className="crm-container">

            {/* SIDEBAR */}
            <aside className="crm-sidebar">
              <nav className="nav-menu">
                <div className="nav-item active">
                  <span className="nav-icon">📊</span>
                  <span>Dashboard</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">👥</span>
                  <span>Contacts</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">💼</span>
                  <span>Deals</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📈</span>
                  <span>Reports</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">⚙️</span>
                  <span>Settings</span>
                </div>
              </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="crm-main">

              <div className="page-header">
                <h1>Dashboard Overview</h1>
              </div>

              {/* AUTHENTICATION */}
              <div className="widget-panel auth-panel">
                <h3>🔐 Authentication</h3>
                <p className="panel-description">
                  Enter your Webex access token to initialize the Contact Center widgets.
                </p>
                <div className="token-input-group">
                  <input
                    type="password"
                    className="token-input"
                    placeholder="Paste your access token here..."
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    disabled={isSdkReady}
                  />
                  <button
                    onClick={initializeWidgets}
                    disabled={!accessToken.trim() || isSdkReady || isLoading}
                    className="btn-primary"
                  >
                    {isLoading ? '⏳ Initializing...' : isSdkReady ? '✅ Initialized' : '🚀 Initialize Widgets'}
                  </button>
                </div>
                {isSdkReady && (
                  <p className="success-message">✅ SDK Ready!</p>
                )}
              </div>

              {/* WIDGETS SECTION */}
              {isSdkReady && (
                <div className="widgets-section">
                  <h2>📞 Contact Center Widgets</h2>
                  <div className="widgets-grid">

                    {/* STEP 1: STATION LOGIN */}
                    <div className="widget-panel station-login-panel">
                      <h3>📱 Agent Login</h3>
                      <p className="panel-description">
                        Login to the Contact Center as an agent.
                      </p>
                      {!isLoggedIn ? (
                        <StationLogin
                          profileMode={false}
                          onLogin={() => {
                            setIsLoggedIn(true);
                            console.log('Agent logged in successfully!');
                          }}
                          onLogout={() => {
                            setIsLoggedIn(false);
                            console.log('Agent logged out');
                          }}
                        />
                      ) : (
                        <p className="success-message">✅ You are logged in!</p>
                      )}
                    </div>

                    {/* STEP 2: USER STATE */}
                    {isLoggedIn && (
                      <div className="widget-panel user-state-panel">
                        <h3>🟢 Agent Status</h3>
                        <p className="panel-description">
                          Set your availability status.
                        </p>
                        <UserState
                          onStateChange={(status: any) => {
                            console.log('Agent state changed to:', status?.name);
                          }}
                        />
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* STATS */}
              <div className="stats-grid">
                <div className="stat-card stat-blue">
                  <h3>Total Customers</h3>
                  <div className="stat-value">1,284</div>
                  <div className="stat-change positive">
                    <span>↑ 12.5%</span>
                    <span>vs last month</span>
                  </div>
                </div>
                <div className="stat-card stat-green">
                  <h3>Active Deals</h3>
                  <div className="stat-value">248</div>
                  <div className="stat-change positive">
                    <span>↑ 8.3%</span>
                    <span>vs last month</span>
                  </div>
                </div>
                <div className="stat-card stat-orange">
                  <h3>Revenue (MTD)</h3>
                  <div className="stat-value">$124.5K</div>
                  <div className="stat-change positive">
                    <span>↑ 23.1%</span>
                    <span>vs last month</span>
                  </div>
                </div>
                <div className="stat-card stat-purple">
                  <h3>Conversion Rate</h3>
                  <div className="stat-value">68.2%</div>
                  <div className="stat-change negative">
                    <span>↓ 2.4%</span>
                    <span>vs last month</span>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="table-section">
                <div className="table-header">
                  <h2>Recent Contacts</h2>
                  <button className="btn-primary">+ Add Contact</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Deal Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sarah Johnson</td>
                      <td>TechCorp Inc.</td>
                      <td>sarah.j@techcorp.com</td>
                      <td>(555) 123-4567</td>
                      <td><span className="status-badge status-active">Active</span></td>
                      <td>$45,000</td>
                      <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Michael Chen</td>
                      <td>Digital Solutions</td>
                      <td>m.chen@digitalsol.com</td>
                      <td>(555) 234-5678</td>
                      <td><span className="status-badge status-pending">Pending</span></td>
                      <td>$32,500</td>
                      <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Emily Rodriguez</td>
                      <td>Global Enterprises</td>
                      <td>e.rodriguez@global.com</td>
                      <td>(555) 345-6789</td>
                      <td><span className="status-badge status-active">Active</span></td>
                      <td>$78,000</td>
                      <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </main>
          </div>

          {/* STEP 3: FLOATING TASK LIST */}
          {isLoggedIn && (
            <div className="floating-task-list">
              <div className="floating-panel-header">
                <span className="floating-panel-icon">📋</span>
                <span>Active Tasks</span>
              </div>
              <div className="floating-panel-content">
                <TaskList
                  onTaskAccepted={(task: any) => {
                    console.log('Task accepted:', task);
                  }}
                  onTaskDeclined={(task: any, reason: any) => {
                    console.log('Task declined:', task, 'Reason:', reason);
                  }}
                  onTaskSelected={({ task, isClicked }: any) => {
                    setSelectedTask(task);
                    console.log('Task selected:', task?.data?.mediaType);
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 4: FLOATING CALL CONTROL */}
          {isLoggedIn && selectedTask && (
            <div className="floating-call-control">
              <div className="call-control-header">
                <span className="call-indicator"></span>
                <span>Active Call</span>
              </div>
              <div className="call-control-content">
                <CallControl
                  onHoldResume={({ isHeld, task }: any) => {
                    console.log(isHeld ? 'Call on hold' : 'Call resumed');
                  }}
                  onEnd={({ task }: any) => {
                    console.log('Call ended');
                    setSelectedTask(null);
                  }}
                  onWrapUp={(params: any) => {
                    console.log('Wrap up completed', params?.wrapUpReason);
                  }}
                  onToggleMute={({ isMuted, task }: any) => {
                    console.log(isMuted ? 'Call muted' : 'Call unmuted');
                  }}
                  onRecordingToggle={({ isRecording, task }: any) => {
                    console.log(isRecording ? 'Recording started' : 'Recording stopped');
                  }}
                />
              </div>
            </div>
          )}

        </IconProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
