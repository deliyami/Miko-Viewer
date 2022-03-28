import { HStack } from '@chakra-ui/react';
import DonateBallon from '@src/components/viewing/donateBallon/DonateBallon';
import { FC } from 'react';

const Donate: FC = () => {
  return (
    <>
      <HStack>
        <DonateBallon path="addland_heatfav_v2"></DonateBallon>
      </HStack>
      <div>yaho</div>
    </>
  );
};

export default Donate;
