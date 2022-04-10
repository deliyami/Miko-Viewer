import { model } from '@src/state/recoil';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import produce from 'immer';
import { FC, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId?: string | undefined;
  antialias?: boolean | undefined;
}> = ({ ...props }) => {
  const { width, height, path, peerId, ...rest } = props;
  const reactCanvas = useRef(null);
  const setModel = useSetRecoilState(model);
  useEffect(() => {
    if (reactCanvas.current) {
      const onSceneReady = (scene: BABYLON.Scene) => {
        if (BABYLON && BABYLON.SceneLoader) {
          const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

          camera.setTarget(new BABYLON.Vector3(0, 2.5, 0));
          camera.setPosition(new BABYLON.Vector3(0, 1.8, 4.7));

          // 카메라 컨트롤러, 모델뜨는 canvas 드래그로 조절 가능
          // camera.attachControl(true);

          const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene);

          // Default intensity is 1. Let's dim the light a small amount
          light.intensity = 0.2;

          BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
          BABYLON.SceneLoader.ImportMesh('', path, '', scene, (...args) => {
            args[4][18].rotate(new BABYLON.Vector3(0, 0, 1), (Math.PI * 7) / 36, 2);
            args[4][23].rotate(new BABYLON.Vector3(0, 0, 1), -(Math.PI * 7) / 36, 2);
            // args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
            const borns = args[4];
            const originalBorns: BABYLON.Quaternion[] = [];
            for (let j = 0; j < args[4].length; j++) {
              originalBorns[j] = args[4][j].rotationQuaternion?.clone();
            }
            const animations = scene.animationGroups;
            for (let j = 0; j < animations.length; j++) {
              animations[j].stop();
            }

            const createLights = (borns: BABYLON.TransformNode[], index: number, r: number, g: number, b: number, d: number, scene: BABYLON.Scene) => {
              const born = borns[index]; // 15

              const light = new BABYLON.PointLight(`${index}_point_light`, new BABYLON.Vector3(0, 0, 0.5), scene);
              light.parent = born;
              light.intensity = 0.3;
              light.range = 5;
              light.shadowMinZ = 0.2;
              light.shadowMaxZ = 5;
              light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
              light.specular = new BABYLON.Color3(r / d, g / d, b / d);
            };

            const r = 244;
            const g = 152;
            const b = 89;
            const d = 255;

            scene.materials[10] = new BABYLON.StandardMaterial('hand_light', scene);
            scene.materials[10].emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);
            scene.meshes[11].material = scene.materials[10];

            createLights(borns, 15, r, g, b, d, scene);
            createLights(borns, 20, r, g, b, d, scene);

            setModel(
              produce(draft => {
                draft[peerId] = {
                  borns,
                  originalBorns,
                  scene,
                };
              }),
            );
            scene.render();
          });
        }
      };
      const engine = new BABYLON.Engine(reactCanvas.current);
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
      if (scene.isReady()) {
        scene.getEngine().setSize(width, height);
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
  return <canvas ref={reactCanvas} {...rest}></canvas>;
};
