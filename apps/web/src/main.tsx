import { createRoot } from "react-dom/client";
import "./style.css";
import { SessionProvider } from "./components/session-provider";
import { Header } from "./components/header";
import { TaskList } from "./components/task-list";

const App = () => (
  <SessionProvider>
    <Header/>
   <TaskList/>
  </SessionProvider>
);

createRoot(document.getElementById("app")!).render(<App />);
