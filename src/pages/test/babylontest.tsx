import { Button, Center, Input, VStack } from '@chakra-ui/react';
import { NEXT_URL } from '@src/const';
import { model } from '@src/state/recoil/modelState';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import produce from 'immer';
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

const babylontest = () => {
  // const { width, height, path, peerId, ...rest } = props;
  const rRef = useRef(null);
  const gRef = useRef(null);
  const bRef = useRef(null);
  const divideRef = useRef(null);
  const reactCanvas = useRef(null);
  const sceneRef = useRef(null);
  const loadedRef = useRef(null);
  const tmpTextureRef = useRef(null);
  const tmpMaterialRef = useRef(null);
  const inputRef = useRef(null);
  const groundRef = useRef(null);
  const [avatar, setAvatar] = useRecoilState(model);
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
          light.intensity = 0.2;

          groundRef.current = BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, scene);
          //   const mat = new BABYLON.StandardMaterial('mat', scene);
          //   // mat.diffuseColor = new BABYLON.Color3(230 / 255, 0, 200 / 255);

          //   const myDynamicTexture = new BABYLON.DynamicTexture('ground', 300, scene, false);
          //   ground.material = mat;
          //   mat.diffuseTexture = myDynamicTexture;

          //   const img = new Image();
          //   img.src = 'http://localhost:3000/resources/image2.jpg';
          //   img.onload = function () {
          //     console.log(img);
          //     //Add image to dynamic texture
          //     const ctx = myDynamicTexture.getContext();
          //     // ctx.drawImage(img, 0, 0, 300, 300, 0, 0, 30, 6);
          //     ctx.drawImage(img, 0, 0, 300, 300);
          //     console.log('this is ground');
          //     myDynamicTexture.update();
          //   };

          BABYLON.SceneLoader.ImportMesh('', `${NEXT_URL}/resources/babylonjs/models/proseka/proseka.glb`, '', scene, (...args) => {
            loadedRef.current = args;
            /*
                args === import된 model의 정보 array
                args[0] === BABYLON.AbstractMesh[] (BABYLON.Mesh[]랑 거의 비슷, 형변환해도 문제 없다고 공식 업데이트?문서에 적혀있음) 피부, Mesh. 
                    default args[0][1] === 얼굴 앞 정수리 뒷통수, 팔꿈치~손의 앞과 뒤, 다리 앞과 뒤
                                    [2] === 몸통 앞 뒤, 어깨~팔꿈치 앞과 뒤
                                    [3] === 머리 정수리 좌우? 부분
                                    [4] === 팔다리, 몸통의 옆부분
                                    [5] === 턱?의 좌우? 부분
                                    [6] === 턱?의 아래, 손바닥? 팔꿈치 연결관절? 어깨관절?부분
                                    [8] === 봉 손잡이
                                    [9] === 봉 이어지는 부분
                                    [10] === 봉 빛나는 부분
                args[4] === BABYLON.TransformNode[] 관절, 정점?쯤 됨, 현재 팔, 머리 움직이는데 중요한 부분

                scene에서 material이 몇번째 material이 args[0] 이랑 짝지어지는지 확인해봐야함
            */

            args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
            const borns = args[4];
            const originalBorns: BABYLON.Quaternion[] = [];
            for (let j = 0; j < args[4].length; j++) {
              originalBorns[j] = args[4][j].rotationQuaternion?.clone();
            }
            args[4][14].rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2, 2);
            const animations = scene.animationGroups;
            for (let j = 0; j < animations.length; j++) {
              animations[j].stop();
            }
            setAvatar(
              produce(draft => {
                draft[0] = {
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
        <VStack>
          <canvas ref={reactCanvas}></canvas>
          <Input type="number" placeholder="사진 적용 index" ref={inputRef}></Input>
          <Button
            onClick={e => {
              e.preventDefault();

              // // const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 300, height: 300 }, sceneRef.current);

              // const mat = new BABYLON.StandardMaterial('face', sceneRef.current);
              // // mat.diffuseColor = new BABYLON.Color3(230 / 255, 0, 200 / 255);

              // const myDynamicTexture = new BABYLON.DynamicTexture('face', 300, sceneRef.current, false);
              // tmpTextureRef.current = myDynamicTexture;
              // tmpMaterialRef.current = mat;
              // mat.diffuseTexture = myDynamicTexture;

              // var img = new Image();
              // img.src = 'http://localhost:3000/resources/image2.jpg';
              // img.onload = function () {
              //   console.log(img);
              //   const ctx = myDynamicTexture.getContext();
              //   ctx.drawImage(img, 0, 0, 10, 10);
              //   console.log('들어옴');

              //   //   console.log(myDynamicTexture.isReady()); // 이거로는 알 수 없음
              //   myDynamicTexture.update();
              // };

              // console.log('args', loadedRef);
              // console.log('scene', sceneRef.current);
              // console.log('materials', sceneRef.current.materials[7]);

              // const ground = groundRef.current;

              if (typeof inputRef.current.value === 'undefined') return;
              const mesh = loadedRef.current[0][inputRef.current.value];
              const mat = new BABYLON.StandardMaterial('mat', sceneRef.current);
              // mat.diffuseColor = new BABYLON.Color3(230 / 255, 0, 200 / 255);
              let removeMaterial;
              if (sceneRef.current.materials[12]) {
                removeMaterial = sceneRef.current.materials.splice(12, 1);
              }
              const myDynamicTexture = new BABYLON.DynamicTexture('ground', 300, sceneRef.current, false);
              // ground.material = mat;
              mesh.material = mat;
              tmpMaterialRef.current = mat;
              //   mat.diffuseTexture = myDynamicTexture;
              mat.diffuseTexture = new BABYLON.Texture('http://localhost:3000/resources/image2.jpg', sceneRef.current);
              const img = new Image();
              img.src = 'http://localhost:3000/resources/image2.jpg';
              img.onload = function () {
                console.log(img);
                //Add image to dynamic texture
                const ctx = myDynamicTexture.getContext();
                // ctx.drawImage(img, 0, 0, 300, 300, 0, 0, 30, 6);
                ctx.drawImage(img, 0, 0, 300, 300);
                console.log('this is ground');
                myDynamicTexture.update();
              };
            }}
          >
            사진 적용
          </Button>
          <Input type="number" placeholder="R color" ref={rRef} defaultValue={255}></Input>
          <Input type="number" placeholder="G color" ref={gRef} defaultValue={255}></Input>
          <Input type="number" placeholder="B color" ref={bRef} defaultValue={0}></Input>
          <Input type="number" placeholder="divide color" ref={divideRef} defaultValue={255}></Input>
          <Button
            onClick={e => {
              e.preventDefault();
              const meshes = loadedRef.current[0] as BABYLON.Mesh[];
              const temp = meshes[10];
              const mat = new BABYLON.StandardMaterial('light', sceneRef.current);
              // const myDynamicTexture = new BABYLON.Texture('ground', 300, sceneRef.current, false);
              // ground.material = mat;
              temp.material = mat;
              tmpMaterialRef.current = mat;
              // ambientColor: Color3 === (ambient 주위의) 뭐지 이거 emissive랑 뭐가 다르니?
              // diffuseColor: Color3 === (diffuse 분산시키다, 확산되다) 반사광이였나? 음영진곳에 light?들어가는 기법...
              // specularColor: Color3 === (specular 거울같이 비추는, 반사하는) 하이라이트
              // emissiveColor: Color3 === (emissive 방사성의, 방사된) 전체적인 light? 색상,
              const r = rRef.current.value;
              const g = gRef.current.value;
              const b = bRef.current.value;
              const d = divideRef.current.value;

              mat.emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);

              const born = loadedRef.current[4][17];

              var light = new BABYLON.PointLight('light', born.position, sceneRef.current);
              light.parent = meshes[10];
              light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
              light.specular = new BABYLON.Color3(r / d, g / d, b / d);
            }}
          >
            봉 색상 적용하기
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              console.log('scene', sceneRef.current);
              console.log('args', loadedRef.current);
            }}
          >
            Scene 등 ref 값 확인하는 버튼
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default babylontest;
