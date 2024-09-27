import { createRoot } from "react-dom/client";
import App from "./main/App/App.tsx";
import { registerServiceWorker } from "./serviceWorkerRegistration.ts";

import "./index.scss";

createRoot(document.getElementById("root")!).render(<App />);

registerServiceWorker();
