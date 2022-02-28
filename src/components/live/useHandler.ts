import { User } from "@src/types/User";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

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

export const useHandler = (user: React.MutableRefObject<User[]>) => {
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
        window.model.name.text[i].text = `${i}인덱스: ${newUser[i].name!}`;
        window.model.chat.position[i].position.x = 0;
        move.push(i);
      }
    }
    console.log(move);
    for (let i = 0; i < move.length; i++) {
      window.model.borns[move[i]][27].translate(
        new BABYLON.Vector3(1, 0, 0),
        3 * (move.length - 1) - 6 * i
      );
      // console.log(window.modelBorns[move[i]][27].absolutePosition)
      window.model.name.position[move[i]].position.x =
        3 * (move.length - 1) - 6 * i;
      window.model.chat.position[move[i]].position.x =
        3 * (move.length - 1) - 6 * i;
      // args[4][27].translate(new BABYLON.Vector3(1,0,0),-2*(user.length-1)+4*i))
    }
  };
  const addUserHandler = (userName: string) => {
    // const randomSeat = Math.floor(Math.random()*user.length)
    const randomEmail = Math.floor(Math.random() * 10);
    const randomId = Math.floor(Math.random() * 100 + 1);
    const randomCoin = Math.floor(Math.random() * 10000) * 100;
    const newUser = [...user.current];
    newUser.push({
      id: randomId,
      name: userName,
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
  const removeUserHandler = (userName: string) => {
    const removeUser = [...user.current];
    let idx = 0;
    for (let i = 0; i < removeUser.length; i++) {
      if (removeUser[i].name === userName) {
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

  if (!window.model.user && window.sockets) {
    window.model.user = user.current;
    window.sockets.on("welcome", ({ roomId, userName }) => {
      addUserHandler(userName);
      console.log(`${roomId}방에 ${userName}님이 참가하였습니다`);
    });
    window.sockets.on("goodbye", ({ roomId, userName }) => {
      removeUserHandler(userName);
      console.log(`${roomId}방애 ${userName}님이 나가셨습니다`);
    });
  }
  addUserHandler(sessionStorage.getItem("user"));
  user.current = window.model.user;
};
