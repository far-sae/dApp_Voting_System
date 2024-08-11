import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Voting from "./Voting";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Voting user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
