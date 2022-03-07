import { User } from "@src/types/User";
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import type { TPose } from "./kalidokit";
import * as GUI from "babylonjs-gui";

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

export const useHandler = async (
  index: number,
  setUser: React.Dispatch<React.SetStateAction<User[]>>
) => {
  if (index === 0 && typeof window.model === "undefined") {
    const borns: BABYLON.TransformNode[][] = []; // born array
    const quat: BABYLON.Quaternion[][] | undefined[][] = [];
    const nameGround: BABYLON.Mesh[] = [];
    const nameText: GUI.TextBlock[] = [];
    const chatGround: BABYLON.Mesh[] = [];
    const chatText: GUI.TextBlock[] = [];
    window.model = {
      user: [],
      borns: borns,
      originalBorns: quat,
      scene: [],
      name: {
        position: nameGround,
        text: nameText,
      },
      chat: {
        position: chatGround,
        text: chatText,
      },
      pose: {
        pose: [],
        face: [],
      },
    };
  }
  const socket = window.sockets;

  const modelReSeating = (newUser: User[]) => {
    const move: number[] = [];
    for (let i = 0; i < newUser.length; i++) {
      if (typeof newUser[i].id === "number") {
        window.model.name.text[
          i
        ].text = `${newUser[i].id}:${newUser[i].name}인덱스`;
        move.push(i);
      }
    }
  };
  const addUserHandler = (userNickname: string) => {
    const randomEmail = Math.floor(Math.random() * 10);
    const randomId = Math.floor(Math.random() * 100 + 1);
    const randomCoin = Math.floor(Math.random() * 10000) * 100;
    console.log(window.model.user);
    console.log(window.model);
    const newUser = [...window.model.user];
    newUser.push({
      id: randomId,
      name: userNickname,
      email: baseEmail[randomEmail],
      coin: randomCoin,
      avatar: undefined,
    });
    console.log(newUser.length, newUser);
    // window.model.name.text[newUser.length - 1].text = "";
    // window.model.chat.text[newUser.length - 1].text = "";
    modelReSeating(newUser);
    setUser(newUser);
    window.model.user = newUser;
  };
  const removeUserHandler = (userNickname: string) => {
    const removeUser = [...window.model.user];
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
    window.model.name.text[removeUser.length].text = "";
    window.model.chat.text[removeUser.length].text = "";
    modelReSeating(removeUser);
    setUser(removeUser);
    window.model.user = removeUser;
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
        window.dataChannel[socketID].addEventListener("message", (e) => {
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
      window.pcs = { ...window.pcs, [socketID]: pc };
      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  if (window.model.user && window.sockets) {
    const socket = window.sockets;
    socket.on(
      "welcome",
      async (allUsers: Array<{ id: string; nickname: string }>) => {
        allUsers.forEach(async (user) => {
          const pc = createPeerConnection(user.id, user.nickname, 0);
          addUserHandler(user.nickname);
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
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      }
    );

    socket.on(
      "offer",
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendNickname: string;
      }) => {
        const { sdp, offerSendID, offerSendNickname } = data;
        const pc = createPeerConnection(offerSendID, offerSendNickname, 1);
        addUserHandler(offerSendNickname);
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
      "answer",
      (data: {
        sdp: RTCSessionDescription;
        answerSendID: string;
        answerSendNickname: string;
      }) => {
        const { sdp, answerSendID, answerSendNickname } = data;
        const pc: RTCPeerConnection = window.pcs[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );

    socket.on(
      "ice",
      async (data: { ice: RTCIceCandidateInit; iceSendID: string }) => {
        const pc: RTCPeerConnection = window.pcs[data.iceSendID];
        if (!(pc && data.ice)) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.ice));
      }
    );

    socket.on(
      "goodbye",
      (data: { socketID: string; roomID: string; userNickname: string }) => {
        const { userNickname, roomID, socketID } = data;
        if (!window.pcs[socketID]) return;
        window.pcs[socketID].close();
        delete window.pcs[socketID];
        if (!window.dataChannel[socketID]) return;
        window.dataChannel[socketID].close();
        delete window.dataChannel[socketID];
        removeUserHandler(userNickname);
      }
    );
    window.sockets.emit("FE-enter-room", { roomId: roomName, userNickname });
    console.log("to be idolm@ster, i am", sessionStorage.getItem("user"));
  }
  addUserHandler(sessionStorage.getItem("user"));
};
