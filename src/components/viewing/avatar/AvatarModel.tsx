import { Button } from "@chakra-ui/react";
import { modelState } from "@src/state/recoil/modelState";
import { Model } from "@src/types/ModelType";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import _ from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

console.log("model 0");

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId?: string | undefined;
  antialias?: boolean | undefined;
}> = ({ ...props }) => {
  const { width, height, path, peerId, antialias, ...rest } = props;
  const reactCanvas = useRef(null);
  console.log("before", modelState);
  const [model, setModel] = useRecoilState(modelState);
  const [localModel, setLocalModel] = useState<{ [peerId: string]: Model }>();
  console.log("model 1");

  useEffect(() => {
    console.log("model 2");
    if (reactCanvas.current) {
      const onSceneReady = (scene: BABYLON.Scene) => {
        console.log("model 3");
        if (BABYLON && BABYLON.SceneLoader) {
          const camera = new BABYLON.ArcRotateCamera(
            "camera",
            Math.PI / 2,
            Math.PI / 2.5,
            10,
            new BABYLON.Vector3(0, 0, 0),
            scene
          );

          camera.setTarget(new BABYLON.Vector3(0, 3.5, 0));
          camera.setPosition(new BABYLON.Vector3(0, 4, 10));

          camera.attachControl(true);

          const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, -1),
            scene
          );

          // Default intensity is 1. Let's dim the light a small amount
          light.intensity = 0.7;

          BABYLON.MeshBuilder.CreateGround(
            "ground",
            { width: 30, height: 6 },
            scene
          );
          console.log("여긴 아닌가?");
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
              console.log("import 성공");
              console.log(args);
              args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
              console.log("model 4");
              const borns = args[4];
              const originalBorns = [];
              for (let j = 0; j < args[4].length; j++) {
                originalBorns[j] = args[4][j].rotationQuaternion?.clone();
              }
              console.log("model 5 클론");
              const animations = scene.animationGroups;
              for (let j = 0; j < animations.length; j++) {
                animations[j].stop();
              }
              console.log("model 6 정지");
              const newModel = {} as { [peerId: string]: Model };
              // for (let value in model) {
              //   newModel[value] = model[value];
              // }
              console.log(borns[0].getScene());
              const newScene = _.cloneDeep(scene);
              console.log(newScene);
              (newModel[peerId] = {
                borns: _.cloneDeep(borns),
                originalBorns: originalBorns,
                scene: _.cloneDeep(scene),
              }),
                setLocalModel(newModel);
              console.log("model 8 렌더 및 모델 설정");
            }
          );
        }
        console.log("model 3-a 끝");
      };
      const engine = new BABYLON.Engine(reactCanvas.current);
      const scene = new BABYLON.Scene(engine);
      if (scene.isReady()) {
        scene.getEngine().setSize(width, height);
        console.log("before copy scene", scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      const resize = () => {
        // scene.getEngine().resize();
      };

      // if (engine) {
      //   engine.runRenderLoop(() => {
      //     scene.render();
      //   });
      // }

      if (window) {
        window.addEventListener("resize", resize);
      }

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
        onClick={(e) => {
          console.log("yaho");
        }}
      ></Button>
    </>
  );
};
