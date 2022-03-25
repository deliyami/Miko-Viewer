import { Box, Image } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { Concert } from '@src/types/share/Concert';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider: FC<{ data: Concert[] }> = ({ data }) => {
  const concerts = data;
  const onClickImage = () => {};
  return (
    <Carousel autoPlay infiniteLoop onClickItem={() => onClickImage()}>
      {concerts.map((concert, idx) => (
        <Box key={idx}>
          <Image src={S3_URL + concert.coverImage} h="400px" objectFit="cover" />
        </Box>
      ))}
    </Carousel>
  );
};
export default ImageSlider;
