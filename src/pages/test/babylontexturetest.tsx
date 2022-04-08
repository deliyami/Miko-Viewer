import { Button, Center } from '@chakra-ui/react';
import { model } from '@src/state/recoil/modelState';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

/* eslint-disable */
// <{
//   width: number;
//   height: number;
//   path: string;
//   peerId?: string | undefined;
//   antialias?: boolean | undefined;
// }>

const babylonTextureTest = () => {
  // const { width, height, path, peerId, ...rest } = props;
  const reactCanvas = useRef(null);
  const sceneRef = useRef(null);
  const loadedRef = useRef(null);
  const [avatar, setAvatar] = useRecoilState(model);
  useEffect(() => {
    if (reactCanvas.current) {
      const onSceneReady = (scene: BABYLON.Scene) => {
        if (BABYLON && BABYLON.SceneLoader) {
          const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

          camera.setTarget(new BABYLON.Vector3(0, 2.5, 0));
          camera.setPosition(new BABYLON.Vector3(0, 360, 0));

          // 카메라 컨트롤러, 모델뜨는 canvas 드래그로 조절 가능
          camera.attachControl(true);

          const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene);

          // Default intensity is 1. Let's dim the light a small amount
          light.intensity = 1.2;
          const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 300, height: 300 }, scene);
          const mat = new BABYLON.StandardMaterial('mat', scene);
          // mat.diffuseColor = new BABYLON.Color3(230 / 255, 0, 200 / 255);

          const myDynamicTexture = new BABYLON.DynamicTexture('fire', 300, scene, false);
          ground.material = mat;
          mat.diffuseTexture = myDynamicTexture;

          var img = new Image();
          img.src = 'http://localhost:3000/resources/image2.jpg';
          img.onload = function () {
            console.log(img);
            //Add image to dynamic texture
            const ctx = myDynamicTexture.getContext();
            // ctx.drawImage(img, 0, 0, 300, 300, 0, 0, 30, 6);
            ctx.drawImage(img, 0, 0, 300, 300);
            console.log('들어옴');
            myDynamicTexture.update();
          };

          //   const meshes = loadedRef.current[0] as BABYLON.AbstractMesh[];
          //     const temp = meshes[7];
          //     const mat = new BABYLON.StandardMaterial('mat', sceneRef.current);
          //     // mat.diffuseColor = new BABYLON.Color3(230 / 255, 0, 200 / 255);

          //     const myDynamicTexture = new BABYLON.DynamicTexture('fire', 300, sceneRef.current, false);
          //     temp.material = mat;
          //     mat.diffuseTexture = myDynamicTexture;

          //     var img = new Image();
          //     img.src = 'http://localhost:3000/resources/image2.jpg';
          //     img.onload = function () {
          //       console.log(img);
          //       const ctx = myDynamicTexture.getContext();
          //       ctx.drawImage(img, 0, 0, 10, 10);
          //       console.log('들어옴');
          //       myDynamicTexture.update();
          //     };
        }
      };
      const engine = new BABYLON.Engine(reactCanvas.current);
      const scene = new BABYLON.Scene(engine);
      // scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
      if (scene.isReady()) {
        scene.getEngine().setSize(300, 300);
        sceneRef.current = scene;
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce(newScene => onSceneReady(newScene));
      }

      if (engine) {
        engine.runRenderLoop(() => {
          scene.render();
        });
      }

      return () => {
        scene.getEngine().dispose();
      };
    }
    return () => {};
  }, [reactCanvas]);
  return (
    <>
      <Center>
        <canvas ref={reactCanvas}></canvas>
        <Button
          onClick={e => {
            e.preventDefault();
            console.log('args', loadedRef);
            console.log('scene', sceneRef.current);
            console.log('materials', sceneRef.current.materials[7]);
          }}
        >
          확인하는 버튼
        </Button>
      </Center>
    </>
  );
};

export default babylonTextureTest;
