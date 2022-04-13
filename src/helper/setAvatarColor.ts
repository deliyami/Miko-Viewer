import { Model } from '@src/types/avatar/ModelType';

/**
 *
 * @param theme 설정창에서 고른 캐릭터 번호
 * @returns number[] [red,green,blue]
 */
const setTheme = (theme: string): number[] => {
  let list = [];
  switch (theme) {
    case '0':
      list = [255, 255, 255];
      break;
    case '1':
      list = [57, 199, 187];
      break;
    case '2':
      list = [244, 152, 89];
      break;
    case '3':
      list = [43 * 1.5, 19 * 1.5, 29 * 1.5];
      // list = [80, 180, 143];
      break;
    case '4':
      list = [242, 242, 248];
      break;
    default:
      break;
  }
  console.log(list, theme);
  return [list[0] / 255, list[1] / 255, list[2] / 255];
};

/**
 * body color
 * scene.meshes[2~9].material = scene.materials[13~20] // default materials[1~8]
 * scene.materials[13~20].material.diffuseColor = new BABYLON.Color3(r,g,b); // (r, g, b) <= 1
 * scene.meshes[2~9].material.diffuseColor = new BABYLON.Color3(r,g,b);
 *
 * @param model 유저가 방에 들어올 때 마다 하나씩 증가
 * @param theme 설정창에서 고른 캐릭터 번호
 * @param peerId 유저의 고유 peerid
 */
export const setAvatarColor = (model: { [peerId: string]: Model }, theme: string, peerId: string) => {
  const { scene } = model[peerId];
  const colors = setTheme(theme);
  if (theme === '0') {
    console.log('들어옴');
    console.log(scene.materials);
    console.log(scene.meshes);
    for (let i = 1; i < 11; i++) {
      scene.meshes[i + 1].material = scene.materials[i];
    }
  } else {
    console.log('여긴 테마', colors);
    const mainColor = new BABYLON.Color3(colors[0], colors[1], colors[2]); // (r, g, b) <= 1
    const subColor = new BABYLON.Color3(80 / 255, 180 / 255, 143 / 255);
    for (let i = 1; i < 9; i++) {
      if (theme === '3') {
        scene.materials[12 + i].diffuseColor = i % 2 === 0 ? mainColor : subColor;
        // scene.meshes[i].material.diffuseColor = new BABYLON.Color3(colors[0], colors[1], colors[2]);
        scene.meshes[i + 1].material = scene.materials[12 + i];
      } else {
        scene.materials[12 + i].diffuseColor = mainColor;
        // scene.meshes[i].material.diffuseColor = new BABYLON.Color3(colors[0], colors[1], colors[2]);
        scene.meshes[i + 1].material = scene.materials[12 + i];
      }
    }
  }
};

/**
 * light color logic
 * scene.materials[10].emissiveColor = new BABYLON.Color3(r,g,b);
 *
 * @param model 유저가 방에 들어올 때 마다 하나씩 증가
 * @param theme 설정창에서 고른 캐릭터 번호
 * @param peerId 유저의 고유 peerid
 */
export const setLightColor = (model: { [peerId: string]: Model }, theme: string, peerId: string) => {
  const { scene } = model[peerId];
  const colors = setTheme(theme);
  const lightColor = new BABYLON.Color3(colors[0], colors[1], colors[2]);
  scene.materials[10].emissiveColor = lightColor;
  scene.lights[1].diffuse = lightColor;
  scene.lights[1].specular = lightColor;
  scene.lights[2].diffuse = lightColor;
  scene.lights[2].specular = lightColor;
};
