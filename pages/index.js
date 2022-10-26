import React, { useContext, useState } from "react";
import Head from "next/head";

import { Context } from "../context";

import { useRouter } from "next/router";

import axios from "axios";
import Switch from "../components/switch";
import ClockLoader from "react-spinners/ClockLoader";

export default function Auth() {
  const router = useRouter();

  const { username, setUsername, secret, setSecret, showDarkMode } =
    useContext(Context);

  const [signUp, showSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    if (username.length === 0 || secret.length === 0) {
      alert("Please enter a username and a password");
    }

    setLoading(true);

    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "PRIVATE-KEY": process.env.NEXT_PUBLIC_CHAT_ENGINE_KEY } }
      )
      .then((r) => {
        setLoading(false);
        router.push("/chats");
      })
      .catch((e) => {
        console.error(e);
        alert("Invalid username or password");
      });
  };

  return (
    <div
      className="background"
      style={{ backgroundColor: showDarkMode ? "#0d0c22ee" : "" }}
    >
      <Head>
        <title>GT Chat App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Chat application built with Next.js"
        />
      </Head>
      <Switch />

      {loading && (
        <div className="loader">
          <ClockLoader
            color="#0d0c22"
            loading={loading}
            // cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className="main-container">
        <div
          className="auth-container"
          style={{ backgroundColor: showDarkMode ? "#0d0c22" : "" }}
        >
          <form className="auth-form">
            <div
              className="auth-title"
              style={{ color: showDarkMode ? "#f3f3f4" : "" }}
            >
              GT Chat
            </div>

            <div>
              <div className="input-container">
                <input
                  placeholder="Enter your username"
                  className={`text-input ${showDarkMode ? "dark-input" : ""}`}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    backgroundColor: showDarkMode ? "#0d0c22" : "",
                    color: showDarkMode ? "#f3f3f4" : "",
                  }}
                />
              </div>

              <div className="input-container">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`text-input ${showDarkMode ? "dark-input" : ""}`}
                  onChange={(e) => setSecret(e.target.value)}
                  style={{
                    backgroundColor: showDarkMode ? "#0d0c22" : "",
                    color: showDarkMode ? "#f3f3f4" : "",
                  }}
                />
              </div>

              <button type="submit" className="submit-button" onClick={onLogin}>
                Login / signUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
