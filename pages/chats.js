import React, { useContext } from "react";
import Head from "next/head";

import { Context } from "../context";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Switch from "../components/switch";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret, showDarkMode } = useContext(Context);
  const [showChat, setShowChat] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!username || !secret) {
      router.push("/");
    } else if (typeof document !== null) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, []);

  if (!showChat) return <div />;

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

      <div className="shadow" style={{ margin: "20px" }}>
        <ChatEngine
          height="calc(100vh - 150px)"
          projectID={process.env.NEXT_PUBLIC_PROJECT_ID}
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
