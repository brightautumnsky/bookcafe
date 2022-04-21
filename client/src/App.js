import React from "react";
import "./App.css";
import UploadPage from "./components/UploadPage/UploadPage";
import axios from "axios";

function App() {
  const onClick = async () => {
    const body = {
      name: "test",
      email: "test@email.com",
      password: "1234567",
    };

    const res = await axios.post("/api/users/login", body);
    console.log(res);
  };

  return (
    <div className="App">
      <div className="container">
        <UploadPage />
        <button onClick={onClick} />
      </div>
    </div>
  );
}

export default App;
