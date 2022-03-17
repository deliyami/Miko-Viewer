import { Box, Select } from "@chakra-ui/react";
import { toastLog } from "@src/helper/toastLog";
import { ChangeEventHandler, useEffect, useState } from "react";

// NOTE Navigator.getUserMedia() deprecated
const getUserMedia = navigator.mediaDevices.getUserMedia;
// //@ts-ignore
// navigator.webkitGetUserMedia ||
// //@ts-ignore
// navigator.mozGetUserMedia;

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

  const handelCameraChange: ChangeEventHandler<HTMLSelectElement> = e => {
    getUserMedia({ video: { deviceId: e.target.value } })
      .then(stream => {
        console.log("aaa", stream);
      })
      .catch(err => {
        toastLog("error", "get stream fail", "", err);
      });
  };

  return (
    <Box>
      <label htmlFor="cameraSelect">카메라 선택</label>
      <Select id="cameraSelect" aria-label="카메라 선택" placeholder="Select option" onChange={handelCameraChange}>
        {cameras.map(camera => (
          <option value={camera.deviceId}>{camera.label}</option>
        ))}
      </Select>
    </Box>
  );
};

export default CameraSwitch;
