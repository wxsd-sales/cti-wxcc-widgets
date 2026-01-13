# 🎯 Contact Center Widgets Integration Lab

> **Audience**: Users who want to integrate Webex Contact Center widgets into their CRM application.
>
> **Duration**: ~45 minutes
>
> **What you'll build**: A CRM dashboard with integrated Contact Center capabilities including agent login, state management, task list, and call controls.
> **Note**: This can be uploaded to the widgets sample app and rendered from there as well

---

## 📋 Table of Contents

1. [Prerequisites & Setup](#-prerequisites--setup)
2. [Step 1: Clone the Repository](#step-1-clone-the-repository)
3. [Step 2: Install Dependencies](#step-2-install-dependencies)
4. [Step 3: Run the Application](#step-3-run-the-application)
5. [Step 4: Add Station Login Widget](#step-4-add-station-login-widget)
6. [Step 5: Add User State Widget](#step-5-add-user-state-widget)
7. [Step 6: Add Task List Widget](#step-6-add-task-list-widget)
8. [Step 7: Add Call Control Widget](#step-7-add-call-control-widget)
9. [Complete Code Reference](#-complete-code-reference)
10. [Troubleshooting](#-troubleshooting)

---

## 🛠 Prerequisites & Setup

### Installing Node.js

Node.js is required to run this application. Follow these steps:

#### Windows

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** (Long Term Support) version
3. Run the installer and follow the prompts
4. Restart your computer after installation

#### macOS

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version
3. Run the installer and follow the prompts
4. **OR** use Homebrew: `brew install node`

#### Verify Installation

Open a terminal (Command Prompt on Windows, Terminal on Mac) and run:

```bash
node --version
```

You should see something like `v20.x.x` or higher.

```bash
npm --version
```

You should see something like `9.x.x` or higher.

---

## Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/webex/cc-widgets-crm-lab.git
cd cc-widgets-crm-lab
```

> **Note**: The repository URL will be provided by your instructor.

---

## Step 2: Install Dependencies

In the same terminal, run:

```bash
npm install
```

⏳ **Wait** for all dependencies to install. This may take 2-5 minutes.

You'll see progress bars and eventually a success message.

---

## Step 3: Run the Application

Start the development server:

```bash
npm run dev
```

🎉 **Success!** Open your browser and go to:

```
http://localhost:5173
```

You should see a CRM Dashboard. Leave this terminal running!

---

## Step 4: Add Station Login Widget

The **Station Login Widget** allows agents to log into the Contact Center system.

### 4.1 Open App.tsx

Open the file `src/App.tsx` in your code editor.

### 4.2 Find the Station Login Section

Look for this comment in the code:

```tsx
{
  /* TODO: STEP 4 - STATION LOGIN WIDGET */
}
```

### 4.3 Replace with Widget Code

Copy and paste this code to replace the TODO comment:

```tsx
{
  /* Station Login Widget */
}
<div className="widget-panel station-login-panel">
  <h3>📱 Agent Login</h3>
  {!isLoggedIn ? (
    <StationLogin
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
</div>;
```

### 4.4 Save and Check

Save the file. Your browser should auto-refresh and show the Station Login widget!

---

## Step 5: Add User State Widget

The **User State Widget** lets agents change their availability status (Available, Idle, etc.).

### 5.1 Find the User State Section

Look for this comment in `src/App.tsx`:

```tsx
{
  /* TODO: STEP 5 - USER STATE WIDGET */
}
```

### 5.2 Replace with Widget Code

Copy and paste this code:

```tsx
{
  /* User State Widget */
}
{
  isLoggedIn && (
    <div className="widget-panel user-state-panel">
      <h3>🟢 Agent Status</h3>
      <UserState
        onStateChange={(status) => {
          console.log('Agent state changed to:', status?.name);
        }}
      />
    </div>
  );
}
```

### 5.3 Save and Check

Save the file. After logging in, you'll see the User State dropdown!

---

## Step 6: Add Task List Widget

The **Task List Widget** shows all active tasks/calls assigned to the agent.

### 6.1 Find the Task List Section

Look for this comment in `src/App.tsx`:

```tsx
{
  /* TODO: STEP 6 - TASK LIST WIDGET */
}
```

### 6.2 Replace with Widget Code

Copy and paste this code:

```tsx
{
  /* Task List Widget */
}
{
  isLoggedIn && (
    <div className="widget-panel task-list-panel">
      <h3>📋 Active Tasks</h3>
      <TaskList
        onTaskAccepted={(task) => {
          console.log('Task accepted:', task);
        }}
        onTaskDeclined={(task, reason) => {
          console.log('Task declined:', task, 'Reason:', reason);
        }}
        onTaskSelected={({task, isClicked}) => {
          setSelectedTask(task);
          console.log('Task selected:', task);
        }}
      />
    </div>
  );
}
```

### 6.3 Save and Check

Save the file. The task list will appear when you're logged in and tasks arrive!

---

## Step 7: Add Call Control Widget

The **Call Control Widget** provides buttons to control active calls (hold, mute, transfer, end call, etc.).

### 7.1 Find the Call Control Section

Look for this comment in `src/App.tsx`:

```tsx
{
  /* TODO: STEP 7 - CALL CONTROL WIDGET */
}
```

### 7.2 Replace with Widget Code

Copy and paste this code:

```tsx
{
  /* Call Control Widget */
}
{
  isLoggedIn && selectedTask && (
    <div className="widget-panel call-control-panel">
      <h3>📞 Call Controls</h3>
      <CallControl
        onHoldResume={({isHeld, task}) => {
          console.log(isHeld ? 'Call on hold' : 'Call resumed', task);
        }}
        onEnd={({task}) => {
          console.log('Call ended', task);
          setSelectedTask(null);
        }}
        onWrapUp={(params) => {
          console.log('Wrap up completed', params);
        }}
        onToggleMute={({isMuted, task}) => {
          console.log(isMuted ? 'Call muted' : 'Call unmuted', task);
        }}
      />
    </div>
  );
}
```

### 7.3 Save and Check

Save the file. Call controls will appear when you have an active task!

---

## 📚 Complete Code Reference

Here's what your complete `App.tsx` should look like after all steps:

```tsx
import React, {useState, useEffect} from 'react';
import {StationLogin, UserState, TaskList, CallControl, store} from '@webex/cc-widgets';
import {ThemeProvider, IconProvider} from '@momentum-design/components/dist/react';
import './App.css';

function App() {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  // Initialize the SDK
  const initializeWidgets = async () => {
    if (!accessToken.trim()) {
      alert('Please enter your access token first!');
      return;
    }

    const webexConfig = {
      fedramp: false,
      logger: {level: 'log'},
    };

    try {
      await store.init({webexConfig, access_token: accessToken});
      setIsSdkReady(true);
      console.log('Widgets initialized successfully!');
    } catch (error) {
      console.error('Failed to initialize widgets:', error);
    }
  };

  return (
    <div className="crm-app">
      <ThemeProvider themeclass="mds-theme-stable-lightWebex">
        <IconProvider iconSet="momentum-icons">
          {/* CRM Header */}
          <header className="crm-header">
            <div className="logo">
              CRM<span>Pro</span>
            </div>
            <div className="header-right">
              <input type="text" className="search-bar" placeholder="Search customers, deals..." />
            </div>
          </header>

          <div className="crm-container">
            {/* Sidebar */}
            <aside className="crm-sidebar">
              <nav className="nav-menu">
                <div className="nav-item active">📊 Dashboard</div>
                <div className="nav-item">👥 Contacts</div>
                <div className="nav-item">💼 Deals</div>
                <div className="nav-item">📈 Reports</div>
                <div className="nav-item">⚙️ Settings</div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="crm-main">
              {/* Authentication Section */}
              <div className="auth-section">
                <h2>🔐 Authentication</h2>
                <div className="token-input">
                  <input
                    type="password"
                    placeholder="Enter your access token"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                  />
                  <button onClick={initializeWidgets} disabled={!accessToken.trim()} className="btn-primary">
                    Initialize Widgets
                  </button>
                </div>
                {isSdkReady && <p className="success-message">✅ SDK Ready!</p>}
              </div>

              {/* Widgets Section */}
              {isSdkReady && (
                <div className="widgets-grid">
                  {/* TODO: STEP 4 - STATION LOGIN WIDGET */}

                  {/* TODO: STEP 5 - USER STATE WIDGET */}

                  {/* TODO: STEP 6 - TASK LIST WIDGET */}

                  {/* TODO: STEP 7 - CALL CONTROL WIDGET */}
                </div>
              )}

              {/* CRM Dashboard Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Customers</h3>
                  <div className="stat-value">1,284</div>
                </div>
                <div className="stat-card">
                  <h3>Active Deals</h3>
                  <div className="stat-value">248</div>
                </div>
                <div className="stat-card">
                  <h3>Revenue (MTD)</h3>
                  <div className="stat-value">$124.5K</div>
                </div>
              </div>

              {/* Contacts Table */}
              <div className="table-section">
                <h2>Recent Contacts</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sarah Johnson</td>
                      <td>TechCorp Inc.</td>
                      <td>sarah.j@techcorp.com</td>
                      <td>
                        <span className="status-active">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Michael Chen</td>
                      <td>Digital Solutions</td>
                      <td>m.chen@digitalsol.com</td>
                      <td>
                        <span className="status-pending">Pending</span>
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
```

---

## 🔧 Troubleshooting

### "npm install" fails

1. Make sure you have Node.js installed correctly
2. Try deleting `node_modules` folder and running `npm install` again
3. Check your internet connection

### Widgets don't appear

1. Make sure you entered a valid access token
2. Check the browser console (F12) for errors
3. Ensure you clicked "Initialize Widgets" button

### "Access token invalid" error

1. Your token may have expired - get a new one
2. Make sure you copied the entire token without extra spaces

### Page is blank

1. Make sure the dev server is running (`npm run dev`)
2. Check for JavaScript errors in the console (F12)

---

## 🎓 What You Learned

✅ How to install Node.js and npm  
✅ How to run a React application  
✅ How to integrate the **Station Login** widget  
✅ How to integrate the **User State** widget  
✅ How to integrate the **Task List** widget  
✅ How to integrate the **Call Control** widget

---

## 📖 Next Steps

- Explore the [Webex Contact Center SDK Documentation](https://developer.webex.com)
- Try customizing the widget styles
- Add more callback handlers for advanced functionality
- Integrate with your actual CRM backend

---

> **Need help?** Contact your workshop instructor or visit the Webex Developer Portal.
