import { Suspense, lazy } from "react";

const IncidentDashboard = lazy(() => import("./components/IncidentDashboard"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="app-shell">
          <header className="topbar">
            <div>
              <p className="eyebrow">Operations workspace</p>
              <h1>Security incident console</h1>
            </div>
            <div className="metric">
              <span>Loading dashboard…</span>
            </div>
          </header>
        </div>
      }
    >
      <IncidentDashboard />
    </Suspense>
  );
}

export default App;
