import React, { useEffect, useRef, useState } from 'react';
import MotionComponent from './MotionComponent'; // uses above component in same directory]
import * as BABYLON from 'babylonjs';
import { useRouter } from 'next/router';

// import BABYLON from 'babylonjs'
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

export const ModelComponent = () => {
  const router = useRouter();
  // console.log('compo router',router) // ... query:{roomId:roomName, user:userName}
  // const [ user, setUser ] = useState<User[]>(new Array<User>(dynamicUserLength));
  
  // const [ user, setUser ] = useState<User[]>(Array.apply(null,Array(dynamicUserLength)).map(()=>{return {id:undefined, name:undefined, email:undefined, coin:undefined}}));
  // const motionsOnOff = useRef<boolean[]>(new Array<boolean>(dynamicUserLength));
  
  return (
    <div>
      {/* <BabylonjsComponent antialias user={user} x={1200} y={300} path={'resources/babylonjs/models/proseka/proseka.glb'} /> */}
      <MotionComponent></MotionComponent>
    </div>
  );
};