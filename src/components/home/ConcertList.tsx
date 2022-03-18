import { Box, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { S3_URL } from "@src/const";
import { Concert } from "@src/types/share/Concert";
import Link from "next/link";
import { FC } from "react";

const ConcertCard: FC<{ concert: Concert }> = ({ concert }) => {
  // console.log(concert);
  return (
    <Box className="movie">
      <Link href="">
        <VStack>
          <Link href={`/concerts/${concert.id}`}>
            <a>
              <Image boxSize="300px" src={S3_URL + concert.coverImage} />
              <VStack pt={3}>
                <Heading size="sm" fontSize="23px">
                  {concert.title}
                </Heading>
                <Text textStyle="body">{concert.artist}</Text>
              </VStack>
            </a>
          </Link>
        </VStack>
      </Link>

      <style>
        {`
            .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 20px;
            }
            .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .movie:hover img {
            transform: scale(1.05);
            }
            .movie h4 {
            font-size: 18px;
            text-align: center;
            }
            `}
      </style>
    </Box>
  );
};

const ConcertList: FC<{ data: Concert[] }> = ({ data }) => {
  const concerts = data;
  return (
    <div>
      <SimpleGrid columns={[2, null, 3]} spacing={10} width="full">
        {concerts.length > 0 &&
          concerts?.map((concert, index) => (
            <Box key={index}>
              <ConcertCard concert={concert} />
            </Box>
          ))}
      </SimpleGrid>
    </div>
  );
};

export default ConcertList;
