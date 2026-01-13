/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPLETED VERSION - App.tsx with all widgets integrated
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is the final version of the CRM application with all Contact Center
 * widgets integrated. Use this as a reference or replace your App.tsx with
 * this file if you want to skip the step-by-step process.
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

// Define task type for TypeScript
interface Task {
  data: {
    interactionId: string;
    mediaType: string;
  };
}

function App() {
  // State management
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configuration for the Webex SDK
  const webexConfig = {
    fedramp: false,
    logger: {
      level: 'log',
    },
  };

  // Initialize the Contact Center Widgets SDK
  const initializeWidgets = async () => {
    if (!accessToken.trim()) {
      alert('Please enter your access token first!');
      return;
    }

    setIsLoading(true);
    
    try {
      await store.init({ webexConfig, access_token: accessToken });
      setIsSdkReady(true);
      console.log('✅ Widgets initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize widgets:', error);
      alert('Failed to initialize widgets. Please check your access token.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crm-app">
      <ThemeProvider themeclass="mds-theme-stable-lightWebex">
        <IconProvider iconSet="momentum-icons">
          
          {/* ═══════════════════════════════════════════════════════════════
              CRM HEADER
              ═══════════════════════════════════════════════════════════════ */}
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
            
            {/* ═══════════════════════════════════════════════════════════════
                SIDEBAR NAVIGATION
                ═══════════════════════════════════════════════════════════════ */}
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

            {/* ═══════════════════════════════════════════════════════════════
                MAIN CONTENT AREA
                ═══════════════════════════════════════════════════════════════ */}
            <main className="crm-main">
              
              {/* Page Title */}
              <div className="page-header">
                <h1>Dashboard Overview</h1>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  AUTHENTICATION SECTION
                  ───────────────────────────────────────────────────────────── */}
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
                  <p className="success-message">✅ SDK Ready! You can now use the widgets below.</p>
                )}
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  CONTACT CENTER WIDGETS SECTION
                  ───────────────────────────────────────────────────────────── */}
              {isSdkReady && (
                <div className="widgets-section">
                  <h2>📞 Contact Center Widgets</h2>
                  <div className="widgets-grid">
                    
                    {/* ═══════════════════════════════════════════════════════
                        STEP 4: STATION LOGIN WIDGET
                        ═══════════════════════════════════════════════════════ */}
                    <div className="widget-panel station-login-panel">
                      <h3>📱 Agent Login</h3>
                      <p className="panel-description">
                        Login to the Contact Center as an agent to start handling customer interactions.
                      </p>
                      {!isLoggedIn ? (
                        <StationLogin
                          onLogin={() => {
                            setIsLoggedIn(true);
                            console.log('✅ Agent logged in successfully!');
                          }}
                          onLogout={() => {
                            setIsLoggedIn(false);
                            console.log('👋 Agent logged out');
                          }}
                        />
                      ) : (
                        <p className="success-message">✅ You are logged in and ready to receive tasks!</p>
                      )}
                    </div>

                    {/* ═══════════════════════════════════════════════════════
                        STEP 5: USER STATE WIDGET
                        ═══════════════════════════════════════════════════════ */}
                    {isLoggedIn && (
                      <div className="widget-panel user-state-panel">
                        <h3>🟢 Agent Status</h3>
                        <p className="panel-description">
                          Set your availability status. Change to "Available" to start receiving tasks.
                        </p>
                        <UserState
                          onStateChange={(status) => {
                            console.log('🔄 Agent state changed to:', status?.name);
                          }}
                        />
                      </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        STEP 6: TASK LIST WIDGET
                        ═══════════════════════════════════════════════════════ */}
                    {isLoggedIn && (
                      <div className="widget-panel task-list-panel">
                        <h3>📋 Active Tasks</h3>
                        <p className="panel-description">
                          View and manage all your active customer interactions here.
                        </p>
                        <TaskList
                          onTaskAccepted={(task) => {
                            console.log('✅ Task accepted:', task);
                          }}
                          onTaskDeclined={(task, reason) => {
                            console.log('❌ Task declined:', task, 'Reason:', reason);
                          }}
                          onTaskSelected={({ task, isClicked }) => {
                            setSelectedTask(task);
                            console.log('👆 Task selected:', task?.data?.mediaType);
                          }}
                        />
                      </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        STEP 7: CALL CONTROL WIDGET
                        ═══════════════════════════════════════════════════════ */}
                    {isLoggedIn && selectedTask && (
                      <div className="widget-panel call-control-panel">
                        <h3>📞 Call Controls</h3>
                        <p className="panel-description">
                          Control your active call - hold, mute, record, transfer, or end the call.
                        </p>
                        <CallControl
                          onHoldResume={({ isHeld, task }) => {
                            console.log(isHeld ? '⏸️ Call on hold' : '▶️ Call resumed');
                          }}
                          onEnd={({ task }) => {
                            console.log('📴 Call ended');
                            setSelectedTask(null);
                          }}
                          onWrapUp={(params) => {
                            console.log('📝 Wrap up completed', params?.wrapUpReason);
                          }}
                          onToggleMute={({ isMuted, task }) => {
                            console.log(isMuted ? '🔇 Call muted' : '🔊 Call unmuted');
                          }}
                          onRecordingToggle={({ isRecording, task }) => {
                            console.log(isRecording ? '🔴 Recording started' : '⏹️ Recording stopped');
                          }}
                        />
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  CRM DASHBOARD STATS
                  ───────────────────────────────────────────────────────────── */}
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

              {/* ─────────────────────────────────────────────────────────────
                  RECENT CONTACTS TABLE
                  ───────────────────────────────────────────────────────────── */}
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
                    <tr>
                      <td>David Kim</td>
                      <td>Innovation Labs</td>
                      <td>d.kim@innovlabs.com</td>
                      <td>(555) 456-7890</td>
                      <td><span className="status-badge status-active">Active</span></td>
                      <td>$55,200</td>
                      <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Jessica Martinez</td>
                      <td>CloudTech Systems</td>
                      <td>j.martinez@cloudtech.com</td>
                      <td>(555) 567-8901</td>
                      <td><span className="status-badge status-pending">Pending</span></td>
                      <td>$28,900</td>
                      <td>
                        <button className="action-btn">View</button>
                        <button className="action-btn">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Robert Taylor</td>
                      <td>DataFlow Inc.</td>
                      <td>r.taylor@dataflow.com</td>
                      <td>(555) 678-9012</td>
                      <td><span className="status-badge status-inactive">Inactive</span></td>
                      <td>$12,300</td>
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
        </IconProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
