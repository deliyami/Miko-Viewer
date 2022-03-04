import React, { useState, useRef, useEffect } from 'react';
import * as BABYLON from 'babylonjs';
// import * as PoseSolver from 'kalidokit/dist/PoseSolver/index'
// import { Pose as PoseSolver } from 'kalidokit/dist/index'
// import { TPose } from 'kalidokit/dist/Types'
import * as Kalidokit from './kalidokit/index'
import { Pose } from '@mediapipe/pose'
import * as PoseMotion from '@mediapipe/pose'
import { Results } from '@mediapipe/pose'
import * as cam from '@mediapipe/camera_utils'
import '@mediapipe/camera_utils'
import '@mediapipe/control_utils'
// import '@mediapipe/control_utils_3d'
import '@mediapipe/drawing_utils'
import '@mediapipe/pose'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import BabylonjsComponent from './BabylonjsComponent';
import { Button } from '@chakra-ui/react';



const MotionComponent = (props) => {
  const webcamRef = useRef<HTMLVideoElement|null>(null);
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const camera = useRef<cam.Camera|null>(null);
  const [ mediaStream, setMediaStream ] = useState<MediaStream>()
  const [ show, setShow ] = useState<boolean>(false);
  
  //RTC
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});

  const onResults =(results:Results)=>{
    if(window.model&&window.model.scene&&window.model.borns&&window.model.originalBorns){

      // 0번 사용자 results를 window에 저장
  
      const user = window.model.user
      // console.log(user[0])
      const myRig = Kalidokit.Pose.solve(results.poseWorldLandmarks,results.poseLandmarks,
        {
          runtime:'mediapipe',
          video:webcamRef?.current,
          enableLegs: false,
        }
      )
      window.model.pose.pose[0]=myRig
      window.model.pose.face[0]=[results.poseLandmarks[0].x,results.poseLandmarks[7].x,results.poseLandmarks[8].x]
  
      const poseRig = window.model.pose.pose
      const faceRig = window.model.pose.face
      if(window.dataChannel){
        for (const key in window.dataChannel){
          if(window.dataChannel[key].readyState==='open'){
            window.dataChannel[key].send(`${sessionStorage.getItem('user')};${JSON.stringify(poseRig[0])};${JSON.stringify(faceRig[0])}`)
          }
        }
      }
      /**
       * 
       * @param transBorn 모델링
       * @param bornNum 모델링의 처음 시작하는 부분
       * @param kalidoRig 관절 회전 값의 오브젝트, xyz키를 가진 배열...?
       * @param direction 팔 좌우 방향
       */
      const bornTurn=(transBorn:BABYLON.TransformNode[],bornNum:number,kalidoRig:Kalidokit.TPose,direction:number)=>{
        const bornX:number[] = [];
        const bornY:number[] = [];
        const bornZ:number[] = [];
        if(direction===0){
          bornX[0] = kalidoRig.RightUpperArm.x
          bornY[0] = kalidoRig.RightUpperArm.y
          bornZ[0] = kalidoRig.RightUpperArm.z
          bornX[1] = kalidoRig.RightLowerArm.x
          bornY[1] = kalidoRig.RightLowerArm.y
          bornZ[1] = kalidoRig.RightLowerArm.z
          bornX[2] = kalidoRig.RightHand.x
          bornY[2] = kalidoRig.RightHand.y
          bornZ[2] = kalidoRig.RightHand.z
        }else{
          bornX[0] = kalidoRig.LeftUpperArm.x
          bornY[0] = kalidoRig.LeftUpperArm.y
          bornZ[0] = kalidoRig.LeftUpperArm.z
          bornX[1] = kalidoRig.LeftLowerArm.x
          bornY[1] = kalidoRig.LeftLowerArm.y
          bornZ[1] = kalidoRig.LeftLowerArm.z
          bornX[2] = kalidoRig.LeftHand.x
          bornY[2] = kalidoRig.LeftHand.y
          bornZ[2] = kalidoRig.LeftHand.z
        }
        let x = bornX[1] - bornX[0] // 3
        let y = bornY[1] - bornY[0] // 0.1
        let z = bornZ[1] - bornZ[0] // -4
        if(bornX[0]&&bornY[0]&&bornZ[0]){
          //왼팔 보정
          if(direction===0){
            transBorn[bornNum].rotate(new BABYLON.Vector3(1,0,0),bornZ[0]+(Math.PI-0.5)/2,2)
            transBorn[bornNum].rotate(new BABYLON.Vector3(0,1,0),-bornY[0]+(Math.PI-0.5)/2,2)
            transBorn[bornNum].rotate(new BABYLON.Vector3(0,0,1),bornX[0],2)
          }else{
            transBorn[bornNum].rotate(new BABYLON.Vector3(1,0,0),-bornZ[0]+(Math.PI-0.5)/2,2)
            transBorn[bornNum].rotate(new BABYLON.Vector3(0,1,0),-bornY[0]-(Math.PI-0.5)/2,2)
            transBorn[bornNum].rotate(new BABYLON.Vector3(0,0,1),-bornX[0],2)
          }
        }
        let childX = bornX[2] - bornX[1]
        let childY = bornY[2] - bornY[1]
        let childZ = bornZ[2] - bornZ[1]
        if(bornX[1]&&bornY[1]&&bornZ[1]){
          // y x z 
          // x y z 
          // 왼팔 보정
          if(direction===0){
            transBorn[bornNum-1].rotate(new BABYLON.Vector3(1,0,0),bornZ[1]*2,2)
          }else{
            transBorn[bornNum-1].rotate(new BABYLON.Vector3(1,0,0),-bornZ[1]*2,2)
          }
          // transBorn[bornNum-1].rotate(new BABYLON.Vector3(0,1,0),bornY[1],2)
          // transBorn[bornNum-1].rotate(new BABYLON.Vector3(0,0,1),bornX[1],2)
        }
      }
  
      const faceTurn = (transBorn:BABYLON.TransformNode[],faceFront:number, faceLeft:number, faceRight:number) => {
        const avg = (faceLeft+faceRight)/2
        
        // console.log(Math.atan2(avg, faceFront)-(Math.PI/4)-0.02)
        transBorn[7].rotate(new BABYLON.Vector3(0,1,0),-(Math.atan2(avg, faceFront)-(Math.PI/4))*10,2)
      }
      // kalido에서 나온 값을 기반으로... vector의 계산이 있음, (0,-1,0)에서 rotation각도 구하고 BABYLON.Vector3(x,y,z)방향으로 나온 각도만큼 굴려보기
      // 손에서 어깨 방향으로 역으로 계산, 팔꿈치>손 각도 계산>굴리기, (0,-1,0)에서 팔꿈치 각도 계산, 아니면 어깨 위치 계산해서 모두다 어깨 위치 값만큼 뺀 뒤에 계산...
      
      for(let i = 0; i < window.model.borns.length;i++){
        if(!(user[i]&&user[i].id && user[i].name)) break;
        for(let j = 0; j < window.model.borns[0].length;j++){
          if(window.model.borns[i][j].rotationQuaternion&&window.model.originalBorns[i][j]){
              window.model.borns[i][j].rotationQuaternion = window.model.originalBorns[i][j]?.clone()!;
          }
        }
        const borns:BABYLON.TransformNode[] = window.model.borns[i]
        if(poseRig[i]){
          bornTurn(borns,15,poseRig[i],0)
          bornTurn(borns,11,poseRig[i],1)
          faceTurn(borns,faceRig[i][0],faceRig[i][1],faceRig[i][2]);
        }
      }
  
  
      let canvasWidth = canvasRef.current?.width
      let canvasHeight = canvasRef.current?.width
      
      canvasWidth=webcamRef.current?.videoWidth
      canvasHeight=webcamRef.current?.videoHeight
  
  
      const canvasElement = canvasRef.current;
      const canvasLm = canvasElement?.getContext("2d");
      if(canvasElement&& canvasLm){
        canvasLm.save()
        canvasLm.clearRect(0,0,canvasElement.width,canvasElement.height)
        canvasLm.drawImage(results.image, 0,0,canvasElement?.width, canvasElement.height)
        if(results.poseLandmarks){
          drawConnectors(canvasLm,results.poseLandmarks,PoseMotion.POSE_CONNECTIONS,{color:'#CCAACC',lineWidth:2})
          drawLandmarks(canvasLm,results.poseLandmarks,{color:'#FF6666',lineWidth:1})
        }
      }
      window.model.scene.render();
    }
    
  }


  useEffect(()=>{
    setupWebcamVideo()
  },[mediaStream])

  async function setupWebcamVideo(){
    if (!mediaStream) {
      await setupMediaStream()
    } else {
      const videoCurr = webcamRef.current
      if (!videoCurr) return
      const video = videoCurr! as HTMLVideoElement
      if (!video.srcObject) {
        video.srcObject = mediaStream
        setupMediapipe()
        // makeConnection();
      }
    }
  }
  async function setupMediaStream(){
    try {
      const ms = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user' 
          }, 
          audio: true 
        })
      setMediaStream(ms)
      window.mediaStream = ms
      setShow(true)
    } catch (e) {
      alert('Camera is disabled')
      throw e
    }
  }
  function setupMediapipe(){
    
    const pose = new Pose({locateFile:(file)=>{
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});
    //   let pose = new Holistic({locateFile: (file) => {
    //     return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.4.1633559476/${file}`;
    // }});
    pose.setOptions({
      modelComplexity:1,
      smoothLandmarks:true,
      enableSegmentation:true,
      smoothSegmentation:true,
      minDetectionConfidence:0.5,
      minTrackingConfidence:0.5,
    })
    pose.onResults(onResults)
    if(webcamRef.current && webcamRef.current){
      camera.current = new cam.Camera(webcamRef?.current,{
        onFrame:async()=>{
          if(webcamRef.current) await pose.send({image:webcamRef.current})
        },
        width: 320,
        height: 240
      })
      camera.current.start();
    }
    // Options {
    //   selfieMode?: boolean;
    //   modelComplexity?: 0|1|2;
    //   smoothLandmarks?: boolean;
    //   enableSegmentation?: boolean;
    //   smoothSegmentation?: boolean;
    //   minDetectionConfidence?: number;
    //   minTrackingConfidence?: number;
    // }
    return ()=>{
      camera.current?.stop();
      webcamRef.current=null;
      canvasRef.current=null;
      camera.current=null;
    }
  }

  // RTC Code

  // function makeConnection () {
  //   const peerConnection = new RTCPeerConnection();
  //   // peerConnection.addTrack()
  //   mediaStream.getVideoTracks().forEach((track)=>{
  //     // track['test'] = 'num value'
  //     // console.log('트랙',track)
  //     peerConnection.addTrack(track)
  //   })
  //   window.RTCPeer=peerConnection
  // }

  return (
    <>
      <video ref={webcamRef} style={{
        visibility:'hidden',
        position:'absolute',
        width:320,
        height:240,
      }}></video>
      <canvas 
      ref={canvasRef}
      className="faceMaker"
      style={{
        position: "absolute",
        visibility: 'hidden',
        margin: "auto",
        textAlign:"center",
        width:320,
        height: 240,}}></canvas>
      <BabylonjsComponent antialias x={1200} y={300} path={'http://localhost:3000/resources/babylonjs/'} />
      <Button onClick={(e)=>{
        e.preventDefault();
        Object.keys(window.dataChannel).forEach((key)=>{
          console.log('first message',window.dataChannel[key])
        })
        for (const key in window.dataChannel){
          console.log('second message',window.dataChannel[key])
        }
      }}>message button</Button>
    </>
  );
}

export default MotionComponent