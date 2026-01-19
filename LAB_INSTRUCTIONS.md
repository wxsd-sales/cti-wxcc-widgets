# Contact Center Widgets Integration Lab

**Duration**: ~30 minutes

**What you'll build**: A CRM dashboard with integrated Webex Contact Center widgets

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Step 1: Station Login Widget](#step-1-station-login-widget)
4. [Step 2: User State Widget](#step-2-user-state-widget)
5. [Step 3: Floating Task List Widget](#step-3-floating-task-list-widget)
6. [Step 4: Floating Call Control Widget](#step-4-floating-call-control-widget)
7. [Testing Your Integration](#testing-your-integration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js v22+** - Download from [nodejs.org](https://nodejs.org)
- **Code Editor** - VS Code recommended

### Verify Installation

Open your terminal and run:

```bash
node --version
```

You should see `v22.x.x` or higher.

### Required Credentials

- **Webex Access Token** - Get from the [Webex Developer Portal](https://developer.webex.com)
  - Click your profile icon → Copy access token

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cti-wxcc-widgets
```

### 2. Install Dependencies

```bash
npm install
```

> **Note**: If install fails, try: `npm install --ignore-scripts`

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open the Application

Open your browser and go to: **http://localhost:5173**

You should see a CRM Dashboard with an Authentication panel.

### 5. Initialize the SDK

1. Paste your Webex access token in the Authentication panel
2. Click **"Initialize Widgets"**
3. Wait for the **"SDK Ready!"** message

---

## Step 1: Station Login Widget

The Station Login widget allows agents to log into the Contact Center.

### Find this comment in `src/App.tsx`:

```tsx
{/* TODO: STEP 1 - STATION LOGIN WIDGET */}
```

### Replace it with:

```tsx
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
```

### Save and verify:

- Save the file (Ctrl+S / Cmd+S)
- The browser will auto-refresh
- You should see the "Agent Login" panel appear

> **Note**: Once logged in, a **Logout** button will appear in the header (top-right) allowing you to log out at any time.

---

## Step 2: User State Widget

The User State widget lets agents change their availability status.

### Find this comment in `src/App.tsx`:

```tsx
{/* TODO: STEP 2 - USER STATE WIDGET */}
```

### Replace it with:

```tsx
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
```

### Save and verify:

- Save the file
- Log in using the Station Login widget
- The "Agent Status" panel should appear after login

---

## Step 3: Floating Task List Widget

The Task List widget shows active customer interactions. It appears as a floating panel in the bottom-right corner.

### Find this comment in `src/App.tsx`:

```tsx
{/* TODO: STEP 3 - FLOATING TASK LIST WIDGET */}
```

### Replace it with:

```tsx
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
```

### Save and verify:

- Save the file
- After logging in, a floating panel should appear in the bottom-right corner
- The panel has an orange header with "Active Tasks"

---

## Step 4: Floating Call Control Widget

The Call Control widget provides buttons to control active calls. It appears as a floating bar at the bottom-center when there's an active call.

### Find this comment in `src/App.tsx`:

```tsx
{/* TODO: STEP 4 - FLOATING CALL CONTROL WIDGET */}
```

### Replace it with:

```tsx
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
```

### Save and verify:

- Save the file
- The Call Control bar will only appear when you have an active call
- It has a red header with a pulsing green indicator

---

## Testing Your Integration

### Complete Flow:

1. **Initialize** - Enter your token and click Initialize
2. **Login** - Use the Station Login widget to log in
3. **Set Status** - Change your status to "Available" using User State
4. **Receive Call** - Wait for an incoming task (or place a test call to your entry point)
5. **Accept Task** - Click to accept the incoming task in the Task List
6. **Control Call** - Use the Call Control bar to hold, mute, or end the call
7. **Logout** - Click the Logout button in the header when finished

### Widget Layout:

```
┌─────────────────────────────────────────────────────────┐
│  CRM Header                                             │
├──────────┬──────────────────────────────────────────────┤
│          │  [Step 1: Login]    [Step 2: Status]         │
│ Sidebar  │                                              │
│          │  Dashboard Stats & Contacts Table            │
│          │                                              │
│          │                    ┌─────────────────────┐   │
│          │                    │  Step 3: Task List  │   │
│          │                    │  (Bottom-Right)     │   │
│          │                    └─────────────────────┘   │
│          │     ┌────────────────────────────────┐       │
│          │     │  Step 4: Call Control          │       │
│          │     │  (Bottom-Center)               │       │
│          │     └────────────────────────────────┘       │
└──────────┴──────────────────────────────────────────────┘
```

---

## Troubleshooting

### npm install fails

```bash
# Try with ignore-scripts flag
npm install --ignore-scripts
```

### Blank page / Nothing renders

1. Open browser console (F12)
2. Check for JavaScript errors
3. Make sure the dev server is running (`npm run dev`)

### Widgets don't appear after SDK initialization

1. Check the browser console for errors
2. Verify your access token is valid and not expired
3. Make sure you clicked "Initialize Widgets"

### TypeScript errors when pasting code

Make sure you copied the code exactly as shown, including:
- The `: any` type annotations on callback parameters
- The `profileMode={false}` prop on StationLogin

### Floating widgets don't show

- **Task List**: Only appears after you log in
- **Call Control**: Only appears when you have an active call (selectedTask is set)

---

## Reference Files

| File | Description |
|------|-------------|
| `src/App.tsx` | Starter template with TODO placeholders |
| `src/App.completed.tsx` | Completed version with all widgets |
| `src/App.css` | Styles including floating widget styles |

---

## What You Learned

✅ Initialize the Webex Contact Center SDK  
✅ Add Station Login widget for agent authentication  
✅ Add User State widget for availability management  
✅ Add floating Task List widget for viewing interactions  
✅ Add floating Call Control widget for call management

---

## Bonus: Understanding the Logout Function

The logout button in the header uses the following function (already included in the starter code):

```tsx
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
```

This function:
- Calls `store.cc.stationLogout()` with a logout reason
- Resets the `isLoggedIn` state on success
- Clears any selected task
- Logs errors if logout fails

---

## Next Steps

- Customize widget styles in `App.css`
- Add more callback handlers for advanced functionality
- Integrate with your actual CRM backend
- Explore additional widgets in the [Webex Developer Portal](https://developer.webex.com)
