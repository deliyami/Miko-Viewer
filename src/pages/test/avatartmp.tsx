import { Center } from '@chakra-ui/react';
import { TempAvatarModel } from '@src/components/viewing/avatar/TempAvatarModel';
import { NEXT_URL } from '@src/const';

const avatartmp = () => {
  return (
    <Center>
      <TempAvatarModel width={300} height={300} path={`${NEXT_URL}/resources/babylonjs/models/proseka/proseka_tmp.glb`}></TempAvatarModel>
    </Center>
  );
};

export default avatartmp;
