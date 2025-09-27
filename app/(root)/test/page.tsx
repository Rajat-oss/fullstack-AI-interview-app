"use client";

import { useState } from "react";
import { vapi } from "@/lib/vapi.sdk";

export default function TestPage() {
  const [status, setStatus] = useState("idle");

  const testCall = async () => {
    setStatus("connecting");
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const assistant = {
        name: "Test Assistant",
        firstMessage: "Hello! This is a test. Can you hear me?",
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: "You are a test assistant. Just say hello and ask how the user is doing."
          }]
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en"
        }
      };

      vapi.on("call-start", () => setStatus("active"));
      vapi.on("call-end", () => setStatus("ended"));
      vapi.on("error", (error) => {
        console.error("VAPI Error:", error);
        setStatus("error");
      });

      await vapi.start(assistant);
    } catch (error) {
      console.error("Test failed:", error);
      setStatus("error");
    }
  };

  const endCall = () => {
    vapi.stop();
    setStatus("ended");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">VAPI Test</h1>
      <p className="mb-4">Status: {status}</p>
      
      {status === "idle" && (
        <button 
          onClick={testCall}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test VAPI Call
        </button>
      )}
      
      {status === "active" && (
        <button 
          onClick={endCall}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          End Call
        </button>
      )}
    </div>
  );
}