/**
 * COMPLETED VERSION - All widgets integrated in CTI Panel
 * 
 * This file shows the final result after completing all steps.
 * The widgets are organized in a CTI panel on the bottom-left.
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
  const [isCtiPanelOpen, setIsCtiPanelOpen] = useState(true);

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

          {/* CTI PANEL - Bottom Left */}
          <div className={`cti-panel ${isCtiPanelOpen ? 'open' : 'collapsed'}`}>
            
            <div className="cti-panel-header" onClick={() => setIsCtiPanelOpen(!isCtiPanelOpen)}>
              <div className="cti-header-left">
                <span className="cti-icon">📞</span>
                <span className="cti-title">Contact Center</span>
                {isLoggedIn && <span className="cti-status-dot"></span>}
              </div>
              <button className="cti-toggle-btn">
                {isCtiPanelOpen ? '▼' : '▲'}
              </button>
            </div>

            {isCtiPanelOpen && (
              <div className="cti-panel-content">

                {/* Authentication */}
                {!isSdkReady ? (
                  <div className="cti-section">
                    <div className="cti-section-title">🔐 Connect</div>
                    <input
                      type="password"
                      className="cti-token-input"
                      placeholder="Paste access token..."
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                    />
                    <button
                      onClick={initializeWidgets}
                      disabled={!accessToken.trim() || isLoading}
                      className="cti-btn-primary"
                    >
                      {isLoading ? 'Connecting...' : 'Connect'}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Station Login */}
                    <div className="cti-section">
                      {!isLoggedIn ? (
                        <>
                          <div className="cti-section-title">📱 Station Login</div>
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
                        </>
                      ) : (
                        <div className="cti-logged-in-bar">
                          <span className="cti-status-indicator"></span>
                          <span>Logged In</span>
                          <button className="cti-btn-logout" onClick={handleStationLogout}>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>

                    {/* User State */}
                    {isLoggedIn && (
                      <div className="cti-section">
                        <div className="cti-section-title">🟢 Status</div>
                        <UserState
                          onStateChange={(status: any) => {
                            console.log('Agent state changed to:', status?.name);
                          }}
                        />
                      </div>
                    )}

                    {/* Task List */}
                    {isLoggedIn && (
                      <div className="cti-section cti-task-section">
                        <div className="cti-section-title">📋 Tasks</div>
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
                    )}
                  </>
                )}

              </div>
            )}
          </div>

          {/* FLOATING CALL CONTROL - Bottom Center */}
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
                    console.log('Call ended - waiting for wrapup');
                  }}
                  onWrapUp={(params: any) => {
                    console.log('Wrap up completed', params?.wrapUpReason);
                    setSelectedTask(null);
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
