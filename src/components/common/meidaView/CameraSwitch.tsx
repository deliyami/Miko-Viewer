import { Box, Select } from '@chakra-ui/react';
import { toastLog } from '@src/helper';
import { myStreamState, peerDataListState } from '@src/state/recoil';
import produce from 'immer';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

// NOTE Navigator.getUserMedia() deprecated
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) as typeof navigator.mediaDevices.getUserMedia;

async function getConnectedDevices(type: MediaDeviceKind) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === type);
}

const CameraSwitch: FC = () => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [audios, setCAudios] = useState<MediaDeviceInfo[]>([]);
  const [curCameraId, setCurCameraId] = useState<string>();
  const [curAudioId, setCurAudioId] = useState<string>();

  const [myStream, setMyStream] = useRecoilState(myStreamState);
  const setPeerDataList = useSetRecoilState(peerDataListState);

  console.log(myStream.getAudioTracks());
  console.log(myStream.getVideoTracks()[0].label);
  console.log(myStream.getTracks());

  useEffect(() => {
    const deviceChangeHandler = async () => {
      const initCameras = await getConnectedDevices('videoinput');
      const initAudios = await getConnectedDevices('audioinput');
      setCameras(initCameras);
      setCAudios(initAudios);
    };

    deviceChangeHandler(); // 초기 set 실행
    navigator.mediaDevices.addEventListener('devicechange', deviceChangeHandler); // 이후 기기 변경시에 실행

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', deviceChangeHandler);
    };
  }, []);

  const updateStreamToPeerData = (stream: MediaStream) => {
    setPeerDataList(
      produce(draft => {
        draft.forEach(peerData => {
          console.log('peerData', peerData.mediaConnection.peerConnection.getSenders());
          peerData.mediaConnection.peerConnection.getSenders()[0].replaceTrack(stream.getVideoTracks()[0]);
          // peerData.mediaConnection.peerConnection.getSenders()[1].replaceTrack(stream.getAudioTracks()[0]);
          console.log('updateStreamToPeerData', peerData.mediaConnection.peerConnection.getSenders(), stream.getVideoTracks(), stream.getAudioTracks());
        });
      }),
    );
  };

  const handelCameraChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const deviceId = e.target.value;
    getUserMedia({ video: { deviceId }, audio: curAudioId ? { deviceId: curAudioId } : true })
      .then(stream => {
        setMyStream(stream);
        updateStreamToPeerData(stream);
        setCurCameraId(deviceId);
      })
      .catch(err => {
        toastLog('error', 'get stream fail', '', err);
      });
  };

  const handelAudioChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const deviceId = e.target.value;
    getUserMedia({ audio: { deviceId }, video: curCameraId ? { deviceId: curCameraId } : true })
      .then(stream => {
        setMyStream(stream);
        updateStreamToPeerData(stream);
        setCurAudioId(deviceId);
      })
      .catch(err => {
        toastLog('error', 'get stream fail', '', err);
      });
  };

  return (
    <Box>
      <label htmlFor="cameraSelect">
        카메라 선택
        <Select id="cameraSelect" aria-label="카메라 선택" placeholder="Select option" onChange={handelCameraChange}>
          {cameras.map(camera => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </Select>
      </label>
      <label htmlFor="audioSelect">
        오디오 선택 선택
        <Select id="audioSelect" aria-label="오디오 선택" placeholder="Select option" onChange={handelAudioChange}>
          {audios.map(audio => (
            <option key={audio.deviceId} value={audio.deviceId}>
              {audio.label}
            </option>
          ))}
        </Select>
      </label>
    </Box>
  );
};

export default CameraSwitch;
