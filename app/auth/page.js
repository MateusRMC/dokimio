"use client";

import { useState } from "react";
import "./auth.scss";

export default function Home() {
  const [emailReg, setEmailReg] = useState("");
  const [passReg, setPassReg] = useState("");

  const [emailLog, setEmailLog] = useState("");
  const [passLog, setPassLog] = useState("");

  const [toggleForm, setToggleForm] = useState(false);

  async function register(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailReg,
        password: passReg,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.log("Erro no registro:", json.error);
      return;
    }

    console.log("Registro:", json);

    if (json.needsEmailConfirmation) {
      console.log("Conta criada. Confirme seu e-mail.");
    } else {
      console.log("Conta criada e usuário logado.");
      window.location.href = "/notes";
    }
  }

  async function login(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailLog,
        password: passLog,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.log("Erro no login:", json.error);
      return;
    }

    console.log("Login:", json);

    window.location.href = "/notes";
  }

  return (
    <div className="auth">
      <h1 className="authGreeting">Let's get started</h1>
      {toggleForm ? (
        <form className="login" onSubmit={login}>
          <input
            className="inputAuth"
            type="email"
            placeholder="Your best email"
            onChange={(e) => setEmailLog(e.target.value)}
            value={emailLog}
            required
          />

          <input
            type="password"
            className="inputAuth"
            placeholder="Type your password"
            onChange={(e) => setPassLog(e.target.value)}
            value={passLog}
            required
          />

          <input className="submitAuth" type="submit" value="LOGIN" />
        </form>
      ) : (
        <form className="register" onSubmit={register}>
          <input
            type="email"
            className="inputAuth"
            placeholder="Your best email"
            onChange={(e) => setEmailReg(e.target.value)}
            value={emailReg}
            required
          />

          <input
            type="password"
            className="inputAuth"
            placeholder="Type your password"
            onChange={(e) => setPassReg(e.target.value)}
            value={passReg}
            required
          />

          <input className="submitAuth" type="submit" value="REGISTER" />
        </form>
      )}
      <button
        className="toggle"
        type="button"
        onClick={() => (toggleForm ? setToggleForm(false) : setToggleForm(true))}
      >
        {toggleForm ? "Create an Account" : "I have an account already"}
      </button>
    </div>
  );
}
