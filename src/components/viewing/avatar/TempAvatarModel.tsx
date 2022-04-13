import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { FC, useEffect, useRef } from 'react';

export const TempAvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId?: string | undefined;
  antialias?: boolean | undefined;
}> = ({ ...props }) => {
  const { width, height, path, ...rest } = props;
  const reactCanvas = useRef(null);
  useEffect(() => {
    if (reactCanvas.current) {
      const onSceneReady = (scene: BABYLON.Scene) => {
        if (BABYLON && BABYLON.SceneLoader) {
          const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

          camera.setTarget(new BABYLON.Vector3(0, 2.5, 0));
          camera.setPosition(new BABYLON.Vector3(0, 1.8, 4.7));

          // 카메라 컨트롤러, 모델뜨는 canvas 드래그로 조절 가능
          camera.attachControl(true);

          const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, -1), scene);

          // Default intensity is 1. Let's dim the light a small amount
          light.intensity = 1;

          BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
          BABYLON.SceneLoader.ImportMesh('', path, '', scene, (...args) => {
            args[4][18].rotate(new BABYLON.Vector3(0, 0, 1), (Math.PI * 7) / 36, 2);
            args[4][23].rotate(new BABYLON.Vector3(0, 0, 1), -(Math.PI * 7) / 36, 2);
            args[4][21].rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2, 0);
            // args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
            const bones = args[4];

            const createLights = (bones: BABYLON.TransformNode[], index: number, r: number, g: number, b: number, d: number, scene: BABYLON.Scene) => {
              const bone = bones[index]; // 15

              const light = new BABYLON.PointLight(`${index}_point_light`, new BABYLON.Vector3(0, 0, 0.5), scene);
              light.parent = bone;
              light.intensity = 0.18;
              light.range = 5;
              light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
              light.specular = new BABYLON.Color3(r / d, g / d, b / d);
            };

            const r = 244;
            const g = 152;
            const b = 89;
            const d = 255;
            console.log(scene.materials);
            for (let j = 1; j < 9; j++) {
              // scene.meshes[j].material = new BABYLON.StandardMaterial(`${j}_body`, scene);
              // scene.meshes[j].material.diffuseColor = new BABYLON.Color3(r / d, g / d, b / d);
              // scene.meshes[1~8].material = scene.materials[12~19]
              // scene.materials[12~19].material.diffuseColor = new BABYLON.Color3(r,g,b); // (r, g, b) <= 1
              new BABYLON.StandardMaterial(`${j}_body`, scene);
              // scene.meshes[j].material.diffuseColor = new BABYLON.Color3(r / d, g / d, b / d);
            }
            // hand
            // scene.materials[10].emissiveColor = new BABYLON.Color3(r,g,b);

            scene.materials[10] = new BABYLON.StandardMaterial('hand_light', scene);
            scene.materials[10].emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);
            scene.meshes[11].material = scene.materials[10];
            scene.materials.pop();

            createLights(bones, 15, r, g, b, d, scene);
            createLights(bones, 20, r, g, b, d, scene);

            scene.render();
          });
        }
      };
      const engine = new BABYLON.Engine(reactCanvas.current);
      const scene = new BABYLON.Scene(engine);
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
