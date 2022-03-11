import { Button } from "@chakra-ui/react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { FC, useEffect, useRef } from "react";
import { setModel } from "./GlobalModel";

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId?: string | undefined;
  antialias?: boolean | undefined;
}> = ({ ...props }) => {
  const { width, height, path, peerId, antialias, ...rest } = props;
  const reactCanvas = useRef(null);
  useEffect(() => {
    if (reactCanvas.current) {
      const onSceneReady = (scene: BABYLON.Scene) => {
        if (BABYLON && BABYLON.SceneLoader) {
          const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

          camera.setTarget(new BABYLON.Vector3(0, 2.5, 0));
          camera.setPosition(new BABYLON.Vector3(0, 2.5, 5));

          camera.attachControl(true);

          const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, -1), scene);

          // Default intensity is 1. Let's dim the light a small amount
          light.intensity = 0.7;

          BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 6 }, scene);
          BABYLON.SceneLoader.ImportMesh(
            "",
            path,
            // "/test",
            "",
            scene,
            (...args) => {
              if (peerId) {
                console.log("나는야 신나고 즐겁지");
              }
              args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
              const borns = args[4];
              const originalBorns = [];
              for (let j = 0; j < args[4].length; j++) {
                originalBorns[j] = args[4][j].rotationQuaternion?.clone();
              }
              const animations = scene.animationGroups;
              for (let j = 0; j < animations.length; j++) {
                animations[j].stop();
              }
              setModel(peerId, {
                borns: borns,
                originalBorns: originalBorns,
                scene: scene,
              });
              scene.render();
            },
          );
        }
      };
      const engine = new BABYLON.Engine(reactCanvas.current);
      const scene = new BABYLON.Scene(engine);
      if (scene.isReady()) {
        scene.getEngine().setSize(width, height);
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce(scene => onSceneReady(scene));
      }

      const resize = () => {
        scene.getEngine().resize();
      };

      if (engine) {
        engine.runRenderLoop(() => {
          scene.render();
        });
      }

      // if (window) {
      //   window.addEventListener("resize", resize);
      // }

      return () => {
        scene.getEngine().dispose();
      };
    }
    return () => {};
  }, [reactCanvas]);
  console.log("modeling?");
  return (
    <>
      <canvas ref={reactCanvas} {...rest}></canvas>
      <Button
        onClick={e => {
          console.log("yaho");
        }}
      ></Button>
    </>
  );
};
