# Contact Center Widgets Integration Lab

**Duration**: ~30 minutes

**What you'll build**: A CRM dashboard with a CTI (Computer Telephony Integration) panel containing Webex Contact Center widgets

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Step 1: Station Login Widget](#step-1-station-login-widget)
4. [Step 2: User State Widget](#step-2-user-state-widget)
5. [Step 3: Task List Widget](#step-3-task-list-widget)
6. [Step 4: Call Control Widget](#step-4-call-control-widget)
7. [Testing Your Integration](#testing-your-integration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js v22+** - Download from [nodejs.org](https://nodejs.org)
- **Code Editor** - VS Code recommended

### Verify Installation

```bash
node --version   # Should show v22.x.x or higher
```

### Required Credentials

- **Webex Access Token** - Get from the [Webex Developer Portal](https://developer.webex.com)

---

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd cti-wxcc-widgets
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Open the Application

Open: **http://localhost:5173**

You'll see a CRM Dashboard with a **CTI Panel** in the bottom-left corner.

### 4. Connect to Contact Center

1. Click on the CTI Panel header to expand it
2. Paste your Webex access token
3. Click **"Connect"**

---

## Application Layout

```
┌─────────────────────────────────────────────────────────┐
│  CRM Header                                             │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Sidebar  │  Dashboard Content                           │
│          │  (Stats, Tables, etc.)                       │
│          │                                              │
│          │                                              │
│          │     ┌────────────────────────────┐           │
│          │     │  Call Control (Floating)   │           │
│          │     │  (appears during calls)    │           │
│          │     └────────────────────────────┘           │
├──────────┴──────────────────────────────────────────────┤
│ ┌──────────────┐                                        │
│ │ CTI Panel    │  <- All widgets go here                │
│ │ - Login      │                                        │
│ │ - Status     │                                        │
│ │ - Tasks      │                                        │
│ └──────────────┘                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Step 1: Station Login Widget

The Station Login widget allows agents to log into the Contact Center.

### Find in `src/App.tsx`:

```tsx
{/* TODO: STEP 1 - STATION LOGIN WIDGET */}
```

### Replace with:

```tsx
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
```

### Verify:

- Save the file
- The Station Login form should appear in the CTI panel after connecting
- Log in using your agent credentials

---

## Step 2: User State Widget

The User State widget lets agents change their availability status.

### Find in `src/App.tsx`:

```tsx
{/* TODO: STEP 2 - USER STATE WIDGET */}
```

### Replace with:

```tsx
<UserState
  onStateChange={(status: any) => {
    console.log('Agent state changed to:', status?.name);
  }}
/>
```

### Verify:

- Save the file
- After logging in, the Status dropdown appears in the CTI panel
- Change your status to "Available" to receive calls

---

## Step 3: Task List Widget

The Task List widget shows incoming and active customer interactions.

### Find in `src/App.tsx`:

```tsx
{/* TODO: STEP 3 - TASK LIST WIDGET */}
```

### Replace with:

```tsx
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
```

### Verify:

- Save the file
- The Tasks section appears in the CTI panel after logging in
- When you receive a call, it will appear here

---

## Step 4: Call Control Widget

The Call Control widget provides buttons to control active calls. It appears as a floating bar at the bottom-center during active calls.

### Find in `src/App.tsx`:

```tsx
{/* TODO: STEP 4 - FLOATING CALL CONTROL WIDGET */}
```

### Replace with:

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
```

### Verify:

- Save the file
- When you have an active call, the Call Control bar appears at the bottom-center
- The widget stays visible during wrapup phase

---

## Testing Your Integration

### Complete Flow:

1. **Connect** - Paste token and click Connect in CTI panel
2. **Login** - Log in as an agent using Station Login
3. **Set Status** - Change status to "Available"
4. **Receive Call** - Wait for incoming task in the Tasks section
5. **Accept** - Click to accept the incoming task
6. **Control** - Use the floating Call Control bar
7. **End & Wrapup** - End call and complete wrapup
8. **Logout** - Click Logout in the CTI panel when done

### CTI Panel Features:

- **Collapsible** - Click the header to expand/collapse
- **Status Indicator** - Green dot shows when logged in
- **Compact Design** - Stays out of the way of CRM content

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm install` fails | Run `npm install --ignore-scripts` |
| CTI panel not visible | Check bottom-left corner of screen |
| Widgets not loading | Verify access token is valid |
| TypeScript errors | Include `: any` type annotations |
| Call Control not showing | Requires active task (selectedTask) |

---

## Reference Files

| File | Description |
|------|-------------|
| `src/App.tsx` | Starter template with TODO placeholders |
| `src/App.completed.tsx` | Completed version with all widgets |

---

## What You Learned

- Initialize the Webex Contact Center SDK
- Build a CTI panel for agent interactions
- Add Station Login for agent authentication
- Add User State for availability management
- Add Task List for viewing incoming interactions
- Add floating Call Control for call management
