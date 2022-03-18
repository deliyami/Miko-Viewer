import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Center, Flex, Grid, GridItem, Icon, Image } from "@chakra-ui/react";
import { S3_URL } from "@src/const";
import { Concert } from "@src/types/share/Concert";
import { FC } from "react";

const Carousel: FC<{ data: Concert[] }> = ({ data }) => {
  const concerts = data;
  // console.log(S3_URL + concerts[0].coverImage);
  const onBeforePageHandler = () => {};

  const onNextPageHandler = () => {};

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <Center>
          <GridItem colStart={1}>
            <Flex justify="end">
              <Icon as={ArrowLeftIcon} onClick={onBeforePageHandler} />
            </Flex>
          </GridItem>
        </Center>
        <GridItem colStart={2} colEnd={5}>
          <AspectRatio maxW="100%" maxH="350px" ratio={5 / 4}>
            <Center>{concerts?.[1] && <Image src={S3_URL + concerts[1].coverImage} alt="naruto" objectFit="cover" />}</Center>
          </AspectRatio>
        </GridItem>
        <Center>
          <GridItem colStart={5}>
            <Icon as={ArrowRightIcon} onClick={onNextPageHandler} />
          </GridItem>
        </Center>
      </Grid>
    </Box>
  );
};
export default Carousel;
