import React, { useState } from "react";

const Login = ({ setUsername, setPassword, signIn }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="salasana"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={signIn}>kirjaudu</button>
    </div>
  );
};

export default Login;
