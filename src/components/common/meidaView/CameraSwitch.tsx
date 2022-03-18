import { Box, Select } from "@chakra-ui/react";
import { toastLog } from "@src/helper/toastLog";
import { myStreamState } from "@src/state/recoil/viewingState";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// NOTE Navigator.getUserMedia() deprecated
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) as typeof navigator.mediaDevices.getUserMedia;

async function getConnectedDevices(type: MediaDeviceKind) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === type);
}

const CameraSwitch = params => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [audios, setCAudios] = useState<MediaDeviceInfo[]>([]);
  const [myStream, setMyStream] = useRecoilState(myStreamState);
  console.log(myStream.getAudioTracks());
  console.log(myStream.getVideoTracks()[0].label);
  console.log(myStream.getTracks());
  const [curCameraId, setCurCameraId] = useState<string>();
  const [curAudioId, setCurAudioId] = useState<string>();

  useEffect(() => {
    const deviceChangeHandler = async () => {
      const initCameras = await getConnectedDevices("videoinput");
      const initAudios = await getConnectedDevices("audioinput");
      setCameras(initCameras);
      setCAudios(initAudios);
    };

    deviceChangeHandler();
    navigator.mediaDevices.addEventListener("devicechange", deviceChangeHandler);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", deviceChangeHandler);
    };
  }, []);

  const handelCameraChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const deviceId = e.target.value;
    getUserMedia({ video: { deviceId }, audio: curAudioId ? { deviceId: curAudioId } : true })
      .then(stream => {
        setMyStream(stream);
        setCurCameraId(deviceId);
      })
      .catch(err => {
        toastLog("error", "get stream fail", "", err);
      });
  };

  const handelAudioChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const deviceId = e.target.value;
    getUserMedia({ audio: { deviceId }, video: curCameraId ? { deviceId: curCameraId } : true })
      .then(stream => {
        setMyStream(stream);
        setCurAudioId(deviceId);
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
      <Select id="audioSelect" aria-label="오디오 선택" placeholder="Select option" onChange={handelAudioChange}>
        {audios.map(audio => (
          <option value={audio.deviceId}>{audio.label}</option>
        ))}
      </Select>
    </Box>
  );
};

export default CameraSwitch;
