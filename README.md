# Beacon

A community safety dashboard for reporting incidents, coordinating patrols, and sharing alerts with residents.

Beacon is a React application built for residential communities. It brings day-to-day safety workflows into one interface, with role-aware access for residents, patrol officers, and administrators.

## Product capabilities

- **Incident management:** browse and filter reports, view incident details, submit reports, add comments, and track status.
- **Patrol operations:** start and end patrols, record checkpoints, and review patrol activity.
- **Community alerts:** view alerts and publish updates with severity and zone targeting.
- **Account management:** register, sign in, manage profile details, and use role-specific workflows.
- **Responsive interface:** light, dark, and system theme options, with layouts for mobile and desktop.

The frontend connects to the Beacon API at `https://1-community-watch-api.vercel.app/api/v1`.

## Built with

- React 19
- Vite 6
- Tailwind CSS 4
- Lucide React
- Motion

## Quick start

### Requirements

- Node.js 20 or later
- npm

### Install and run locally

```bash
git clone <repository-url>
cd beacon
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. The development server binds to `0.0.0.0`, which also makes it reachable from other devices on your local network.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Generate the production bundle in `dist/`. |
| `npm run preview` | Serve the production bundle locally for review. |

## Application structure

```text
src/
├── components/
│   ├── incidents/    # Incident feed and filtering
│   ├── layout/       # Shared header and footer
│   ├── patrol/       # Patrol status and checkpoint UI
│   └── ui/           # Reusable interface elements
├── context/          # Authentication and theme state
├── lib/              # API client and shared constants
├── pages/            # Landing, incidents, patrol, alerts, profile, and auth views
├── App.jsx           # View composition and navigation
└── main.jsx          # Application entry point
```

## API and authentication

API requests are centralized in `src/lib/api.js`. The client uses bearer token authentication and stores the session token and user profile in browser local storage. A `401` response clears the stored session and redirects the user to sign in.

The API base URL is currently defined in the client. Keep credentials and other secrets out of source control. If the API endpoint needs to vary by environment, configure it through a Vite environment variable (for example, `VITE_API_BASE_URL`) before deploying.

## Development notes

- Shared incident categories, priorities, statuses, alert severities, and zones are defined in `src/lib/constants.js`.
- Authentication and theme behavior live in React context providers under `src/context/`.
- The app uses view state for navigation and requires no client-side router configuration.
- `npm run build` is the production compilation command.

## License

No license has been specified for this repository yet.
