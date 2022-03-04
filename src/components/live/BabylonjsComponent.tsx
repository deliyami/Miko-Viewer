import { Engine, Scene, FreeCamera, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader } from '@babylonjs/core';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui'
import Kalidokit from 'kalidokit'
import React, { useEffect, useRef } from 'react';
import { User } from '@src/types/User';
import 'babylonjs-loaders';
import { useHandler } from './useHandler';

type props = {
  x:number,
  y:number,
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
      scene:BABYLON.Scene,
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
  }
}

const BabylonjsComponent = (props:props) => {
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, path, x, y, ...rest } = props;
  const reactCanvas = useRef(null);
  const user = useRef<User[]>([]);

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
      if (BABYLON&&BABYLON.SceneLoader) {
        const borns:BABYLON.TransformNode[][]=[]; // born array
        const quat:BABYLON.Quaternion[][]|undefined[][]=[];
        const nameGround:BABYLON.Mesh[] = [];
        const nameText:GUI.TextBlock[] = [];
        const chatGround:BABYLON.Mesh[] = [];
        const chatText:GUI.TextBlock[] = [];
        window.model={
          borns:borns,
          originalBorns:quat,
          scene:scene,
          name:{
            position:nameGround,
            text:nameText
          },
          chat:{
            position:chatGround,
            text:chatText
          },
          pose:{
            pose:[],
            face:[]
          }
        }
        for(let i = 0;i<5;i++){
          BABYLON.SceneLoader.ImportMesh('',path+'models/proseka/proseka.glb','',scene,(...args)=>{
            args[4][27].rotate(new BABYLON.Vector3(0,1,0),Math.PI,2)
            borns[i]=args[4]
            quat[i]=[]
            for(let j = 0;j<args[4].length;j++){
              quat[i][j]=args[4][j].rotationQuaternion?.clone()
            }
            const animations = scene.animationGroups;
            const meshes = scene.meshes
            animations[i].stop()
            args[4][27].translate(new BABYLON.Vector3(1,0,0),-500,2)
            const makeGround = (groundName:string, positionY:number, positionZ:number,
                                  width:string, height:string, checkName:number) => {
              const ground = BABYLON.Mesh.CreateGround(groundName, 26, 26, 0, scene);        
              ground.rotation = new BABYLON.Vector3(5, Math.PI, 0);
              ground.position = new BABYLON.Vector3(0, positionY, positionZ);
              ground.position.x += -500
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
                nameGround[i] = ground
                nameText[i] = textBox
              }else{
                chatGround[i] = ground
                chatText[i] = textBox
              }
            }
            makeGround(`nameGround${i}`,0.5,1.5,'175px','40px',1)
            makeGround(`chatGround${i}`,5,0,'175px','137.78px',0)
            if(i===0){
              useHandler(user)
            }
          })
        }
      }
      const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene);
    
      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;
    
      // Our built-in 'ground' shape.
      BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
    };
    if (reactCanvas.current) {
      const engine = new BABYLON.Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new BABYLON.Scene(engine, sceneOptions);
      if (scene.isReady()) {
        scene.getEngine().setSize(x, y);
        onSceneReady(scene, path);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, path));
      }

      // engine.runRenderLoop(() => {
        // for(let i = 0; i < window.modelBorns.length;i++){
        //   for(let j = 0; j < window.modelBorns[0].length;j++){
        //     if(window.modelBorns[i][j].rotationQuaternion&&window.modelOriginalBorns[i][j]){
        //         window.modelBorns[i][j].rotationQuaternion = window.modelOriginalBorns[i][j]?.clone()!;
        //     }
        //   }
        // }
        // scene.render();
      // });

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
      <canvas ref={reactCanvas} {...rest} />
    </>
  );
};

export default BabylonjsComponent