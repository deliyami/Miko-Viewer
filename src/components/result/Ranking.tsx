import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { NEST_URL, NEXT_URL } from '@src/const';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Ranking = ({ users }) => {
  const [rank, setRank] = useState([]);
  const router = useRouter();

  function getRank() {
    axios
      .get(`${NEST_URL}/${router.query.id}/getRank`)
      .then(res => {
        console.log(res.data);
        setRank(res.data);
        console.log('겟 랭크!!!', res.data);
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    if (!router.isReady) return;
    getRank();
  }, [router.isReady]);

  return (
    <Flex mb={'4.2%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} rounded={'3%'} h="full" w="30%">
      <Text fontSize={'5xl'}>ランキング</Text>
      <SimpleGrid h={'80%'} w={'full'} columns={1} spacing={2} overflow={'auto'}>
        {users.map((user, key) => {
          return (
            <Flex onClick={() => window.open(`${NEXT_URL}/live/${router.query.id}/result/${key + 1}`, '_self')} cursor={'pointer'} key={key} p={'1.5%'} alignItems={'center'}>
              <Flex w={'10%'} mr={'2%'} border="solid" borderColor={'teal.400'} rounded={100} justifyContent={'center'}>
                <Text fontSize={'3xl'}>{key + 1}</Text>
              </Flex>
              <Flex
                justifyContent={'space-around'}
                pl="2%"
                as={'samp'}
                fontSize={'2xl'}
                textAlign={'center'}
                w={'80%'}
                border={'solid'}
                borderColor="teal.200"
                p={'2%'}
                roundedLeft={100}
                roundedRight={100}
              >
                <Text ml={'7%'}>{user}</Text>
                <Text mt={'1.5%'} color={'gray.400'} fontSize={'md'}>
                  Total : 100
                  {/* {ranking} */}
                  {/* value: id score:100 */}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
export default Ranking;
