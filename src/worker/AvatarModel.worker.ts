import 'babylonjs-loaders';
// 공유 객체 사용가능 할 것

const bones: BABYLON.TransformNode[] = [];
const originalBones: BABYLON.Quaternion[] = [];

const createLights = (funtionBones: BABYLON.TransformNode[], index: number, r: number, g: number, b: number, d: number, scene: BABYLON.Scene) => {
  const bone = funtionBones[index]; // 15

  const light = new BABYLON.PointLight(`${index}_point_light`, new BABYLON.Vector3(0, 0, 0.5), scene);
  light.parent = bone;
  light.intensity = 0.3;
  light.range = 5;
  light.shadowMinZ = 0.2;
  light.shadowMaxZ = 5;
  light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
  light.specular = new BABYLON.Color3(r / d, g / d, b / d);
};

addEventListener('message', async ({ data }) => {
  switch (data.type) {
    case 'init':
      /* eslint-disable */
      const { canvas, path, width, height, peerId } = data;
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

            bones = args[4];

            for (let j = 0; j < args[4].length; j++) {
              originalBones[j] = args[4][j].rotationQuaternion?.clone();
            }
            const animations = scene.animationGroups;
            for (let j = 0; j < animations.length; j++) {
              animations[j].stop();
            }

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
      const engine = new BABYLON.Engine(canvas);
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
      onSceneReady(scene);
      scene.getEngine().setSize(width, height);
      engine.runRenderLoop(() => {
        scene.render();
      });
      break;
    default:
      break;
  }
});
