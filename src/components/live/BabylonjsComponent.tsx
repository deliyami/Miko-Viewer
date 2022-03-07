import { Engine, Scene, FreeCamera, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader } from '@babylonjs/core';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import Kalidokit from 'kalidokit'
import React, { useEffect, useRef, useState } from 'react';
import { User } from '@src/types/User';
import 'babylonjs-loaders';
import { useHandler } from './useHandler';
import { Button } from '@chakra-ui/react';

type props = {
  x:number,
  y:number,
  i:number,
  user:User,
  setUser:React.Dispatch<React.SetStateAction<User[]>>,
  path:string,
  canvasOrContext?: BABYLON.Nullable<HTMLCanvasElement | WebGLRenderingContext>,
  antialias?: boolean | undefined,
  engineOptions?: BABYLON.EngineOptions | undefined,
  adaptToDeviceRatio?: boolean | undefined,
  sceneOptions?: BABYLON.SceneOptions,
}

declare global{
  interface Window{
    model:{
      user?:User[],
      borns:BABYLON.TransformNode[][],
      originalBorns:BABYLON.Quaternion[][]|undefined[][],
      scene:BABYLON.Scene[],
      name:{
        text:GUI.TextBlock[],
        position:BABYLON.Mesh[],
      },
      chat:{
        text:GUI.TextBlock[],
        position:BABYLON.Mesh[],
      },
      pose?:{
        pose:Kalidokit.TPose[]
        face:number[][]
      },
    },
    mediaStream:MediaStream
    dataChannel:{ [socketId:string]: RTCDataChannel }
    pcs:{ [socketId: string]: RTCPeerConnection }
    modelCanvas:React.MutableRefObject<any>[]
  }
}

const BabylonjsComponent = (props:props) => {
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, path, x, y, i, setUser, user, ...rest } = props;
  const reactCanvas = useRef(null);
  const [ on, setOn ] = useState(true)
  // const user = useRef<User[]>([]);

  useEffect(() => {
    const onSceneReady = (scene:BABYLON.Scene, path:string) => {
      const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

      camera.setTarget(new BABYLON.Vector3(0,3.5,0));
      camera.setPosition(new BABYLON.Vector3(0,4,10));

      // const canvas = scene.getEngine().getRenderingCanvas();

      camera.attachControl(true)
    
      const reader = new FileReader();
      reader.onload = function (e) {
      };
      console.log('신난다')
      if (BABYLON&&BABYLON.SceneLoader) {
        console.log('여긴 아닌가?')
        BABYLON.SceneLoader.ImportMesh('',path+'models/proseka/proseka.glb','',scene,(...args)=>{
          if(i === 0 && typeof window.model === 'undefined'){
            console.log('나는 0번 인덱스')
            const borns: BABYLON.TransformNode[][] = []; // born array
            const quat: BABYLON.Quaternion[][] | undefined[][] = [];
            const nameGround: BABYLON.Mesh[] = [];
            const nameText: GUI.TextBlock[] = [];
            const chatGround: BABYLON.Mesh[] = [];
            const chatText: GUI.TextBlock[] = [];
            window.model = {
              user:[],
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
          window.model.scene[i]=scene
          console.log('import 성공')
          args[4][27].rotate(new BABYLON.Vector3(0,1,0),Math.PI,2)
          window.model.borns[i]=args[4]
          window.model.originalBorns[i]=[]
          for(let j = 0;j<args[4].length;j++){
            window.model.originalBorns[i][j]=args[4][j].rotationQuaternion?.clone()
          }
          const animations = scene.animationGroups;
          const meshes = scene.meshes
          for(let j = 0;j<animations.length;j++){
            animations[j].stop()
          }
          const makeGround = (groundName:string, positionY:number, positionZ:number,
                                width:string, height:string, checkName:number) => {
            const ground = BABYLON.Mesh.CreateGround(groundName, 26, 26, 0, scene);        
            ground.rotation = new BABYLON.Vector3(5, Math.PI, 0);
            ground.position = new BABYLON.Vector3(0, positionY, positionZ);
            const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(ground,1024,1024)

            const image = new GUI.Image('image',path+'svg/'+(checkName?'NameTag_ma.svg':'SpeechBallons.svg'))
            image.width = width;
            image.height = height;
            advancedTexture.addControl(image)

            const textBox = new GUI.TextBlock('textBox');
            textBox.fontFamily = 'Helventica'
            textBox.textWrapping = true;
            textBox.width = '125px'
            // textBox.text = 'test lorem ipsum 가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호구누두루무부수우주추쿠투푸후그느드르므브스으즈츠크트프흐기니디리미비시이지치키티피히 여긴 지옥이야 빨리 탈출해!'
            textBox.text = ''
            textBox.color = 'black'
            textBox.fontSize = '14px';
            advancedTexture.addControl(textBox)
            if(checkName){
              // truthy면 name falsey면 chat
              window.model.name.position[i] = ground
              window.model.name.text[i] = textBox
            }else{
              window.model.chat.position[i] = ground
              window.model.chat.text[i] = textBox
            }
          }
          makeGround(`nameGround${i}`,0.5,1.5,'175px','40px',1)
          makeGround(`chatGround${i}`,5,0,'175px','137.78px',0)
          if(i===0){
            useHandler(i,setUser)
          }
        })
      }
      const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene);
    
      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;
    
      // Our built-in 'ground' shape.
      BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
    };
    if(!window.modelCanvas) window.modelCanvas=[]
    window.modelCanvas[i] = reactCanvas
    if (reactCanvas.current) {
      const engine = new BABYLON.Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new BABYLON.Scene(engine, sceneOptions);
      if (scene.isReady()) {
        scene.getEngine().setSize(x, y);
        onSceneReady(scene, path);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, path));
      }

      const resize = () => {
        // scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize);
      }
      

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }
    return(()=>{
    })
  }, [reactCanvas]);
  return (
    <>
      <canvas style={{visibility:user?'visible':'hidden'}} ref={reactCanvas} {...rest} />
      {/* <Button onClick={e=>{
        e.preventDefault()
        setOn(e=>!e)
      }}>on/off</Button> */}
    </>
  );
};

export default BabylonjsComponent