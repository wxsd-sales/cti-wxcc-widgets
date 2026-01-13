# 📚 Contact Center Widgets Labs

This folder contains hands-on labs for integrating Webex Contact Center widgets into applications.

## 📂 Contents

```
labs/
├── README.md                        # This file
├── CC_WIDGETS_BEGINNER_LAB.md       # Step-by-step lab instructions
├── WIDGET_SNIPPETS.md               # Copy-paste code snippets
└── starter-project/                 # Ready-to-use React project
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx                  # Starter template with TODOs
        ├── App.completed.tsx        # Reference: fully completed version
        └── App.css                  # Styles
```

## 🚀 Quick Start

### Option 1: Follow the Lab Step-by-Step

1. Read `CC_WIDGETS_BEGINNER_LAB.md` for detailed instructions
2. Use `WIDGET_SNIPPETS.md` for copy-paste code during the lab
3. Start with `starter-project/src/App.tsx` and fill in the TODOs

### Option 2: Use the Completed Version

1. Copy `starter-project/` to your desired location
2. Replace `App.tsx` with `App.completed.tsx`
3. Run `npm install` and `npm run dev`

## 🎯 Lab Goals

By completing this lab, you will learn to:

- ✅ Install Node.js and set up a React development environment
- ✅ Initialize the Webex Contact Center SDK
- ✅ Integrate the **Station Login** widget for agent authentication
- ✅ Integrate the **User State** widget for availability management
- ✅ Integrate the **Task List** widget for viewing customer interactions
- ✅ Integrate the **Call Control** widget for call management

## 📋 Prerequisites

- **Node.js** v22 or higher
- **npm** v9 or higher
- A valid **Webex Contact Center access token**
- Basic familiarity with a code editor (VS Code recommended)

## 🛠️ Project Setup

```bash
# 1. Copy the starter project
cp -r starter-project my-crm-lab

# 2. Navigate to the project
cd my-crm-lab

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open http://localhost:5173 in your browser
```

## 🧩 If `npm install` fails with `husky: command not found`

Some upstream dependencies may run `husky install` during their install scripts. If you see an error like:
`npm error command sh -c husky install` / `sh: husky: command not found`

Use one of these options:

- **Recommended**: disable husky during install (safe for this prototype):

```bash
HUSKY=0 npm install
```

- **Alternative**: skip all install scripts:

```bash
npm install --ignore-scripts
```

This aligns with the Webex Contact Center widgets quickstart guidance about husky when using npm.

## 🧩 If `npm install` fails due to Node engine requirements

Some widget peer dependencies (notably `@momentum-ui/react-collaboration`) require **Node >= 22**. If your npm enforces engines strictly, Node 20 may still fail install.

- **Recommended**: switch to Node 22+.
- **Temporary workaround** (prototype-only): disable engine strictness for the install:

```bash
npm_config_engine_strict=false npm install
```

## 📖 Lab Structure

The lab is designed for **non-technical users** and follows these principles:

1. **Simple Steps**: Each step is clear and focused on one task
2. **Copy-Paste**: All code snippets are ready to copy-paste
3. **Visual Feedback**: You can see changes immediately in the browser
4. **Progressive**: Widgets appear one-by-one as you complete steps

## 🔧 Available Widgets

| Widget | Purpose |
|--------|---------|
| `<StationLogin />` | Agent login and logout |
| `<UserState />` | Set availability status (Available, Idle, etc.) |
| `<TaskList />` | View and manage active tasks |
| `<CallControl />` | Control active calls (hold, mute, end, etc.) |

## ❓ Troubleshooting

See the **Troubleshooting** section in `CC_WIDGETS_BEGINNER_LAB.md` for common issues and solutions.

## 📚 Additional Resources

- [Webex Contact Center SDK Documentation](https://developer.webex.com)
- [Momentum Design System](https://momentum.design)
- [React Documentation](https://react.dev)

---

> **Need help?** Contact your workshop instructor or visit the Webex Developer Portal.
