import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

//@ts-ignore
const getUserMedia =
  //@ts-ignore
  navigator.getUserMedia ||
  //@ts-ignore
  navigator.webkitGetUserMedia ||
  //@ts-ignore
  navigator.mozGetUserMedia;

async function getConnectedDevices(type: MediaDeviceKind) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === type);
}

const CameraSwitch = params => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [audios, setCAudios] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    (async function setInitCamera() {
      const initCameras = await getConnectedDevices("videoinput");
      setCameras(initCameras);
    })();

    const deviceChangeHandler = async (event: Event) => {
      const newCameraList = await getConnectedDevices("videoinput");
      setCameras(newCameraList);
    };
    navigator.mediaDevices.addEventListener("devicechange", deviceChangeHandler);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", deviceChangeHandler);
    };
  }, []);

  return <Box>{cameras.map(camera => camera.label)}</Box>;
};

export default CameraSwitch;
