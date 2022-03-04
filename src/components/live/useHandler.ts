import { User } from "@src/types/User";
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import type { TPose } from "./kalidokit";

const dynamicUserLength = 5;
const baseName = [
  "철수",
  "영희",
  "민수",
  "김치",
  "치즈",
  "즈드라스트부이쎼",
  "뭐에요저거",
  "신난다",
  "즐겁다",
  "눈물이난다",
];
const baseEmail = [
  "a@a.a",
  "deliyami@gmail.com",
  "example@example.com",
  "pokemon@dlc.com",
  "ribbon@red.com",
  "big@big.int",
  "white@wine.sad",
  "rolling@inthe.deep",
  "set@time.out",
  "piano@challenge.com",
];
const userNickname = sessionStorage.getItem("user");
const roomName = sessionStorage.getItem("roomName");

const pc_config = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
  ],
};

// const handleICE = (data) => {
//   window.sockets.emit("ice", {
//     candidate: data.candidate,
//     candidateSendID: window.sockets.id,
//     // candidateReceiveID: socketID,
//   });
//   console.log("sent ice candidate");
// };

export const useHandler = async (user: React.MutableRefObject<User[]>) => {
  // 여기서 유저길이 조절하고... 유저 지울때는 맨 마지막꺼 지우고...
  const socket = window.sockets;
  // const [ user, setUser ] = useState<User[]>(Array.apply(null,Array(dynamicUserLength)).map(()=>{return {id:undefined, name:undefined, email:undefined, coin:undefined}}));
  // let user: User[] = [];

  const chatHandler = (e) => {
    e.preventDefault();
    // const num = 유저의 index
    // window.model.chat.text[num].text=chat
  };

  const modelReSeating = (newUser: User[]) => {
    const move: number[] = [];
    for (let i = 0; i < newUser.length; i++) {
      if (typeof newUser[i].id === "number") {
        window.model.borns[i][27].translate(
          new BABYLON.Vector3(1, 0, 0),
          window.model.borns[i][27].absolutePosition.x
        );
        window.model.name.position[i].position.x = 0;
        window.model.name.text[
          i
        ].text = `${newUser[i].id}:${newUser[i].name}인덱스`;
        window.model.chat.position[i].position.x = 0;
        move.push(i);
      }
    }
    for (let i = 0; i < move.length; i++) {
      window.model.borns[move[i]][27].translate(
        new BABYLON.Vector3(1, 0, 0),
        -3 * (move.length - 1) + 6 * i
      );
      // console.log(window.modelBorns[move[i]][27].absolutePosition)
      window.model.name.position[move[i]].position.x =
        3 * (move.length - 1) - 6 * i;
      window.model.chat.position[move[i]].position.x =
        3 * (move.length - 1) - 6 * i;
      // args[4][27].translate(new BABYLON.Vector3(1,0,0),-2*(user.length-1)+4*i))
    }
  };
  const addUserHandler = (userNickname: string) => {
    // const randomSeat = Math.floor(Math.random()*user.length)
    const randomEmail = Math.floor(Math.random() * 10);
    const randomId = Math.floor(Math.random() * 100 + 1);
    const randomCoin = Math.floor(Math.random() * 10000) * 100;
    const newUser = [...user.current];
    newUser.push({
      id: randomId,
      name: userNickname,
      email: baseEmail[randomEmail],
      coin: randomCoin,
      avatar: undefined,
    });
    window.model.name.text[newUser.length - 1].text = "";
    window.model.chat.text[newUser.length - 1].text = "";
    modelReSeating(newUser);
    user.current = newUser;
    window.model.user = newUser;
  };
  const removeUserHandler = (userNickname: string) => {
    const removeUser = [...user.current];
    let idx = 0;
    for (let i = 0; i < removeUser.length; i++) {
      if (removeUser[i].name === userNickname) {
        removeUser.splice(i, 1);
        idx = i;
        break;
      }
    }
    for (let i = idx; i < removeUser.length; i++) {
      window.model.name.text[i].text = window.model.name.text[i + 1].text;
      window.model.chat.text[i].text = window.model.chat.text[i + 1].text;
    }
    window.model.borns[removeUser.length][27].translate(
      new BABYLON.Vector3(1, 0, 0),
      -500
    );
    window.model.name.text[removeUser.length].text = "";
    window.model.name.position[removeUser.length].position.x += -500;
    window.model.chat.text[removeUser.length].text = "";
    window.model.chat.position[removeUser.length].position.x += -500;
    // const randomSeat = Math.floor(Math.random()*user.length)
    modelReSeating(removeUser);
    user.current = removeUser;
    window.model.user = removeUser;
    // setMotions(reumoveMotion)
  };

  const dissolutionMessage = (data: string[]) => {
    const nickname = data[0];
    const pose = JSON.parse(data[1]) as TPose;
    const face = JSON.parse(data[2]) as number[];
    const users = window.model.user;
    let index;
    if (users && users.length > 1) {
      users.forEach((user, i) => {
        if (nickname === user.name) {
          index = i;
          return;
        }
      });
    }
    window.model.pose.pose[index] = pose;
    window.model.pose.face[index] = face;
  };

  const createPeerConnection = (
    socketID: string,
    userNickname: string,
    host: number
  ) => {
    try {
      const pc = new RTCPeerConnection(pc_config);
      pc.addEventListener("icecandidate", (data) => {
        window.sockets.emit("ice", {
          candidate: data.candidate,
          candidateSendID: window.sockets.id,
          candidateReceiveID: socketID,
        });
      });

      if (host === 0) {
        const dataChannel = pc.createDataChannel("pose", {
          ordered: true,
        });

        window.dataChannel = { ...window.dataChannel, [socketID]: dataChannel };
        window.dataChannel[socketID].addEventListener("open", (e) => {
          console.log("open", e);
        });
        // window.dataChannel[socketID].addEventListener("message", (e) =>
        //   console.log(e)
        // );
        window.dataChannel[socketID].addEventListener("message", (e) => {
          // console.log(e.data.split(";"));
          dissolutionMessage(e.data.split(";"));
        });
      } else {
        pc.addEventListener("datachannel", (e) => {
          window.dataChannel = {
            ...window.dataChannel,
            [socketID]: e.channel as RTCDataChannel,
          };
          window.dataChannel[socketID].addEventListener("message", (e) => {
            dissolutionMessage(e.data.split(";"));
          });
        });
      }

      // pc.onicecandidate = (e) => {
      //   if (!(window.sockets && e.candidate)) return;
      //   console.log("onicecandidate");
      //   window.sockets.emit("ice", {
      //     candidate: e.candidate,
      //     candidateSendID: window.sockets.id,
      //     candidateReceiveID: socketID,
      //   });
      // };

      // pc.oniceconnectionstatechange = (e) => {
      //   console.log(e);
      // };
      window.pcs = { ...window.pcs, [socketID]: pc };
      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  if (!window.model.user && window.sockets) {
    // await makeConnection();
    window.model.user = user.current;
    const socket = window.sockets;

    socket.on(
      // b
      "welcome",
      async (allUsers: Array<{ id: string; nickname: string }>) => {
        // const peer = window.RTCPeer;
        // RTC
        // console.log(offer);

        allUsers.forEach(async (user) => {
          const pc = createPeerConnection(user.id, user.nickname, 0);
          addUserHandler(user.nickname);
          // pc.addEventListener("icecandidate", handleICE);
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: false,
              offerToReceiveVideo: false,
            });
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            window.sockets.emit("offer", {
              sdp: localSdp,
              offerSocketID: window.sockets.id,
              offerSendNickname: sessionStorage.getItem("user"),
              // offerSendID: user.id,
              // offerSendEmail: user.email,
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      }
    );

    socket.on(
      // a
      "offer",
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string; // 보낸 사람의 socket ID
        offerSendNickname: string;
      }) => {
        const { sdp, offerSendID, offerSendNickname } = data;
        const pc = createPeerConnection(offerSendID, offerSendNickname, 1);
        addUserHandler(offerSendNickname);
        // pc.addEventListener("icecandidate", handleICE);
        // makePoseConnection(offerSendID, pc, 0);
        if (!(pc && window.sockets)) return;
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: false,
            offerToReceiveAudio: false,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          window.sockets.emit("answer", {
            sdp: localSdp,
            answerReceiveID: offerSendID,
            answerSocketID: window.sockets.id,
            answerSendNickname: sessionStorage.getItem("user"),
          });
        } catch (e) {
          console.error(e);
        }
      }
    );

    socket.on(
      //b
      "answer",
      (data: {
        sdp: RTCSessionDescription;
        answerSendID: string;
        answerSendNickname: string;
      }) => {
        // const peer = window.RTCPeer
        const { sdp, answerSendID, answerSendNickname } = data;
        const pc: RTCPeerConnection = window.pcs[answerSendID];
        if (!pc) return;
        // makePoseConnection(answerSendID, pc, 1);
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );

    socket.on(
      "ice",
      async (data: { ice: RTCIceCandidateInit; iceSendID: string }) => {
        // if (window.pcs[data.iceSendID]) return;
        const pc: RTCPeerConnection = window.pcs[data.iceSendID];
        if (!(pc && data.ice)) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.ice));
      }
    );

    socket.on(
      "goodbye",
      (data: { socketID: string; roomID: string; userNickname: string }) => {
        const { userNickname, roomID, socketID } = data;
        // removeUserHandler(userNickname);
        if (!window.pcs[socketID]) return;
        window.pcs[socketID].close();
        delete window.pcs[socketID];
        if (!window.dataChannel[socketID]) return;
        window.dataChannel[socketID].close();
        delete window.dataChannel[socketID];
        removeUserHandler(userNickname);
      }
    );

    // const userName = sessionStorage.getItem("user");
    // const roomName = sessionStorage.getItem("roomName");

    window.sockets.emit("FE-enter-room", { roomId: roomName, userNickname });
    // 처음 들어올 때  서버에서 키 같이 날리기
    console.log("to be idolm@ster, i am", sessionStorage.getItem("user"));
  }
  addUserHandler(sessionStorage.getItem("user"));
  user.current = window.model.user;
};
