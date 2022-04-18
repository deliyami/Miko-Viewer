import { Center } from '@chakra-ui/react';
import { NEXT_URL } from '@src/const';
import { useEffect, useRef } from 'react';

const AvatarModel = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    console.log('start');
    const worker = new Worker(new URL('@src/worker/TmpAvatarModel.worker.ts', import.meta.url), { type: 'module' });
    if ('OffscreenCanvas' in window) {
      const el = document.getElementById('my_avatar') as HTMLCanvasElement;
      const offCanvas = canvasRef.current.transferControlToOffscreen();
      worker.postMessage({ canvas: offCanvas, path: `${NEXT_URL}/resources/babylonjs/models/proseka/proseka_tmp.glb`, width: 450, height: 450, peerId: 'test' }, [offCanvas]);
      worker.onmessage = function (oEvent) {
        const onSceneReady = (scene: BABYLON.Scene) => {
          if (BABYLON && BABYLON.SceneLoader) {
            const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

            camera.setTarget(new BABYLON.Vector3(0, 2.5, 0));
            camera.setPosition(new BABYLON.Vector3(0, 1.8, 4.7));

            // 카메라 컨트롤러, 모델뜨는 canvas 드래그로 조절 가능
            // camera.attachControl(true);

            const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);

            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.6;

            BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
            BABYLON.SceneLoader.ImportMesh('', path, '', scene, (...args) => {
              args[4][18].rotate(new BABYLON.Vector3(0, 0, 1), (Math.PI * 7) / 36, 2);
              args[4][23].rotate(new BABYLON.Vector3(0, 0, 1), -(Math.PI * 7) / 36, 2);

              const bones = args[4];
              console.log(bones);
              const originalBones: BABYLON.Quaternion[] = [];
              for (let j = 0; j < args[4].length; j++) {
                originalBones[j] = args[4][j].rotationQuaternion?.clone();
              }
              const animations = scene.animationGroups;
              for (let j = 0; j < animations.length; j++) {
                animations[j].stop();
              }

              const createLights = (bones: BABYLON.TransformNode[], index: number, r: number, g: number, b: number, d: number, scene: BABYLON.Scene) => {
                const bone = bones[index]; // 15

                const light = new BABYLON.PointLight(`${index}_point_light`, new BABYLON.Vector3(0, 0, 0.5), scene);
                light.parent = bone;
                light.intensity = 0.3;
                light.range = 5;
                light.shadowMinZ = 0.2;
                light.shadowMaxZ = 5;
                light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
                light.specular = new BABYLON.Color3(r / d, g / d, b / d);
              };

              const r = 1;
              const g = 1;
              const b = 1;
              const d = 1;

              for (let j = 1; j < 9; j++) {
                new BABYLON.StandardMaterial(`${j}_body`, scene);
              }
              scene.materials[10] = new BABYLON.StandardMaterial('hand_light', scene);
              scene.materials[10].emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);
              scene.meshes[11].material = scene.materials[10];
              scene.materials[10].name = '0';
              scene.materials[12].name = '0';
              createLights(bones, 15, r, g, b, d, scene);
              createLights(bones, 20, r, g, b, d, scene);

              scene.render();
            });
          }
        };

        console.info('this is avatar:', oEvent);
        const { canvas } = oEvent.data;
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
        onSceneReady(scene);
        scene.getEngine().setSize(width, height);
        engine.runRenderLoop(() => {
          scene.render();
        });
      };
    }
  }, []);
  return (
    <Center w="full" h="100vh">
      <canvas ref={canvasRef} id="my_avatar" width="300px" height="300px"></canvas>
    </Center>
  );
};

export default AvatarModel;
