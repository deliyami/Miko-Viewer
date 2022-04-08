import { model } from '@src/state/recoil/viewing/avatar/modelState';
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
          light.intensity = 1.2;

          BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
          BABYLON.SceneLoader.ImportMesh('', path, '', scene, (...args) => {
            args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
            const borns = args[4];
            const originalBorns: BABYLON.Quaternion[] = [];
            for (let j = 0; j < args[4].length; j++) {
              originalBorns[j] = args[4][j].rotationQuaternion?.clone();
            }
            const animations = scene.animationGroups;
            for (let j = 0; j < animations.length; j++) {
              animations[j].stop();
            }
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
