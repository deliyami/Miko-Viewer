import { Button, Center, Input, VStack } from '@chakra-ui/react';
import { NEXT_URL } from '@src/const';
import { model } from '@src/state/recoil/viewing/avatar/modelState';
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
          // camera.setPosition(new BABYLON.Vector3(0, 1.8, 4.7));
          camera.setPosition(new BABYLON.Vector3(0, 2, 6));

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
          // https://raw.githubusercontent.com/:owner/:repo/:branch/:file_path
          // https://raw.githubusercontent.com/master/babylonjs/public/resources/models/proseka/proseka.glb

          // BABYLON.SceneLoader.ImportMesh('', `${NEXT_URL}/resources/babylonjs/models/proseka/proseka.glb`, '', scene, (...args) => {
          BABYLON.SceneLoader.ImportMesh('', `${NEXT_URL}/resources/babylonjs/models/proseka/proseka_test.glb`, '', scene, (...args) => {
            // BABYLON.SceneLoader.ImportMesh('', 'https://raw.githubusercontent.com/deliyami/babylonjs/master/public/resources/models/proseka/proseka.glb', '', scene, (...args) => {
            loadedRef.current = args;
            console.log('after', args);
            // scene.debugLayer.show({
            //   embedMode: true,
            // });
            // for(let j = 0;j<args[0].length;j++){
            //     args[0][j].
            // }
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
            args[4][18].rotate(new BABYLON.Vector3(0, 0, 1), (Math.PI * 7) / 36, 2);
            args[4][22].rotate(new BABYLON.Vector3(0, 0, 1), -(Math.PI * 7) / 36, 2);

            // args[4][27].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, 2);
            const bones = args[4];
            const originalBones: BABYLON.Quaternion[] = [];
            for (let j = 0; j < args[4].length; j++) {
              originalBones[j] = args[4][j].rotationQuaternion?.clone();
            }

            // const animations = scene.animationGroups;
            // for (let j = 0; j < animations.length; j++) {
            //   animations[j].stop();
            // }

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

            const r = 244;
            const g = 152;
            const b = 89;
            const d = 255;

            scene.materials[10] = new BABYLON.StandardMaterial('hand_light', scene);
            scene.materials[10].emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);
            scene.meshes[11].material = scene.materials[10];

            createLights(bones, 15, r, g, b, d, scene);
            createLights(bones, 20, r, g, b, d, scene);

            setAvatar(
              produce(draft => {
                draft[0] = {
                  bones,
                  originalBones,
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
              const mesh = sceneRef.current.meshes[inputRef.current.value];
              console.log('this is scene', sceneRef.current);
              const mat = new BABYLON.StandardMaterial('mat', sceneRef.current);
              // mat.diffuseColor = new BABYLON.Color3(230 / 255, 0, 200 / 255);
              //   let removeMaterial;
              //   if (sceneRef.current.materials[12]) {
              //     removeMaterial = sceneRef.current.materials.splice(12, 1);
              //   }
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
                myDynamicTexture.update();
              };
            }}
          >
            사진 적용
          </Button>

          <Button
            onClick={() => {
              const meshes = sceneRef.current.meshes; // 2~12
              const materials = sceneRef.current.materials; // 1~10
              console.log(meshes);
              for (let i = 1; i < 11; i++) {
                meshes[i + 1].material = materials[i];
                if (i >= 11) break;
              }
            }}
          >
            texture reset
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
              // diffuseColor: Color3 === (diffuse 분산시키다, 확산되다) 반사광이였나? 음영진곳에 light?들어가는 기법... 아닌가 default깔리는 색상이나 texture인가
              // specularColor: Color3 === (specular 거울같이 비추는, 반사하는) 하이라이트
              // emissiveColor: Color3 === (emissive 방사성의, 방사된) 전체적인 light? 색상,
              const r = rRef.current.value;
              const g = gRef.current.value;
              const b = bRef.current.value;
              const d = divideRef.current.value;

              mat.emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);

              const bone = loadedRef.current[4][13]; // 9 13

              var light = new BABYLON.PointLight('pointlight', new BABYLON.Vector3(0, 2, 2), sceneRef.current);
              //   var light = new BABYLON.PointLight('light', new BABYLON.Vector3(bone.absolutePosition.x, bone.absolutePosition.y, bone.absolutePosition.z), sceneRef.current);
              //   const light = new BABYLON.HemisphericLight('bright', new BABYLON.Vector3(0, 2, -1), sceneRef.current);
              light.parent = bone;

              const mesh = loadedRef.current[0][1] as BABYLON.AbstractMesh;
              light.range = 5;
              light.shadowMinZ = 0.2;
              light.shadowMaxZ = 5;
              light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
              light.specular = new BABYLON.Color3(r / d, g / d, b / d);
              var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {}, sceneRef.current);
              sphere.position.y = 4;
            }}
          >
            봉 색상 적용하기
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              //   draft[0] = {
              //     bones,
              //     originalBones,
              //     scene,
              //   };
              avatar[0].bones[14].rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, 2);
            }}
          >
            팔 회전
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
