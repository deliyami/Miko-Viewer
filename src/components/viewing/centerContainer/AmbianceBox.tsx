import { Center } from '@chakra-ui/react';
import styles from '@src/style/css/viewing.module.scss';

export default function AmbianceBox(): JSX.Element {
  return (
    <Center h="full" w="full" zIndex="0" position="absolute">
      <canvas className={styles.ambiance} id="ambiance" />
    </Center>
  );
}
