import { Box, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { Concert } from '@src/types/share';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const RankingCard: FC<{ data: Concert }> = ({ data: concert }) => {
  const concertStartDate = convertDate(concert.allConcertStartDate, 'YMDHM');

  return (
    <>
      <Link href={`/concerts/${concert.id}`}>
        <a>
          <Box className="concert">
            <Image
              src={IMAGE_DOMAIN + concert.coverImage}
              placeholder="blur"
              blurDataURL="/image/defaultImage.png"
              quality={100}
              objectFit="cover"
              width={300}
              height={300}
              alt="concertImage"
              style={{ borderRadius: '12px' }}
            />
          </Box>
          <Box pt={2}>
            <Text color="gray.700" fontSize="sm">
              {concertStartDate}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {concert.title}
            </Text>
          </Box>
          <style>
            {`
              .concert {
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' 
                transition: all 0.2s linear;
                transition-duration: 0.2s;
              }
              .concert:hover {
                transform: scale(1.05);
                transition-duration: 0.2s;
              }
            `}
          </style>
        </a>
      </Link>
    </>
  );
};

const MainRanking: FC<{ data: Concert[] }> = ({ data: concerts }) => {
  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2000 };

  return (
    <>
      {/* {concerts?.map((concert, index) => (
          <Box key={index} maxW="300px">
            <RankingCard data={concert} />
          </Box>
        ))} */}
      <div className="post-slider">
        <div className="post-wrapper">
          <div className="post">1</div>
          <div className="post">2</div>
          <div className="post">3</div>
          <div className="post">4</div>
          <div className="post">5</div>
        </div>
      </div>
      <style>
        {`
              .post-slider{
                border:1px solid red;
              }
              .post-slider .post-wrapper{
                width:84%;
                height:350px;
                margin:0px auto;
                border:1px dashed red;
              }
              .post-slider .post-wrapper .post{
                width:300px;
                height:350px;
                display:inline-block;
                background:gray;
              }
              
           `}
      </style>
    </>
  );
};
export default MainRanking;
