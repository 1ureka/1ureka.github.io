import { useState } from "react";
import HW1 from "./hw1/App";
import Forum from "./forum/App";

type Project = "hw1" | "forum" | null;

function App() {
  const [project, setProject] = useState<Project>(null);

  if (project === "hw1") {
    return <HW1 />;
  }

  if (project === "forum") {
    return <Forum />;
  }

  return (
    <div>
      <title>1ureka's 測試樣板專案</title>
      <button onClick={() => setProject("hw1")}>HW1</button>
      <button onClick={() => setProject("forum")}>Forum</button>
    </div>
  );
}

export default App;
