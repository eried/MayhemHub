"use client";

import { useEffect, useState } from "react";
import { useSerial } from "../SerialLoader/SerialLoader";

export default function Controller() {
  const { serial, consoleMessage } = useSerial();
  const [consoleMessageList, setConsoleMessageList] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const sendCommand = () => {
    serial.write(command);
    setCommand("");
  };

  useEffect(() => {
    setConsoleMessageList(
      (prevConsoleMessageList) => prevConsoleMessageList + consoleMessage
    );
  }, [consoleMessage]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 p-5 w-full h-full">
        <h1>Connected to HackRF!</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div></div>
            <button
              onClick={() => serial.write("button 2")}
              className="w-16 h-16 bg-green-500 text-white rounded"
            >
              Left
            </button>
            <div></div>
            <button
              onClick={() => serial.write("button 4")}
              className="w-16 h-16 bg-green-500 text-white rounded"
            >
              Up
            </button>
            <button
              onClick={() => serial.write("button 5")}
              className="w-16 h-16 bg-blue-500 text-white rounded"
            >
              OK
            </button>
            <button
              onClick={() => serial.write("button 3")}
              className="w-16 h-16 bg-green-500 text-white rounded"
            >
              Down
            </button>
            <div></div>
            <button
              onClick={() => serial.write("button 1")}
              className="w-16 h-16 bg-green-500 text-white rounded"
            >
              Right
            </button>
            <div></div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => serial.write("button 6")}
            className="w-16 h-16 bg-slate-400 text-white rounded"
          >
            DFU
          </button>
          <button
            onClick={() => serial.write("reboot")}
            className="w-16 h-16 bg-slate-400 text-white rounded"
          >
            Reboot
          </button>
        </div>

        {!serial.isReading ? (
          <button
            className="p-2 bg-orange-300 text-white rounded"
            onClick={() => serial.startReading()}
          >
            Start reading console
          </button>
        ) : (
          <>
            <div className="flex items-center justify-center mt-10 w-[80%] gap-1">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendCommand();
                  }
                }}
                className="p-2 border-2 border-blue-500 rounded-md text-black w-full"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  sendCommand();
                }}
              >
                Send
              </button>
            </div>
            <textarea
              className="w-[80%] h-[350px] p-2 bg-gray-200 rounded text-black"
              readOnly
              value={consoleMessageList}
            />
          </>
        )}
      </div>
    </>
  );
}
