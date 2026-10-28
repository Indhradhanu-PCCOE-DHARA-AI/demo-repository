
import { useState } from "react";
import Intro from "./pages/Intro.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import InfoPage from "./pages/InfoPage.jsx";

export default function App() {
  const [page, setPage] = useState("intro");

  if (page === "intro") {
    return <Intro onComplete={() => setPage("auth")} />;
  }

  if (page === "auth") {
    return (
      <AuthPage
        onDemoSignIn={() => setPage("info")}
      />
    );
  }

  return <InfoPage />;
}
