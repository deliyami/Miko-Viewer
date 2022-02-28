import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    if (!window.sockets) {
      window.sockets = io("http://localhost:3001", {
        // autoConnect: true,
        // forceNew: true,
        // transports의 순서대로 연결 시도, 웹 소켓이 우선순위이므로...
        transports: ["websocket", "polling"],
      })
        .on("connect", () => {
          console.log("connect 👌", window.sockets.connected);
        })
        .on("error", (err) => {
          console.log(err);
        });
    }
    setSocket(window.sockets);
  }, []);

  return socket;
};

export default useSocket;
