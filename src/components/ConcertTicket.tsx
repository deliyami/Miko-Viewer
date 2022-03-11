import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";

const concert = [
  {
    id: 1,
    name: "東京ヤクルトスワローズ公式マスコットつばみ",
    url: "https://obs.line-scdn.net/0haRQfol8DPn1sHyoT35pBKjxCOAoVMSRsCGciGhkZaR0VfXguAy4kTh5IMEQVLXopVHh5GUoYZU9EKHksVXx4Gk0WZU5BJyt7VH53GAweN0hFe315Uw/f640x640",
  },
  {
    id: 2,
    name: "fripSide",
    url: "https://obs.line-scdn.net/0hBj2461zQHUUPTQranmZiEl8QGzJ2YwdUazUGJy1OQXQnL14TNi4BI31OSnElKFkVMnhXIX5EQSEnf1oUNilVKilFRnQidQhDOixaIW9MFHcnL1gUYQ/f640x640",
  },
];

const TicketDetail = ({ name }) => {
  return (
    <Box flex="1 1 auto" padding="10px 30px 10px">
      <Heading fontWeight="600" size="lg" my="20px">
        {name}
      </Heading>
      <dl>
        <dt>販売期間</dt>
        <dd>2022/01/24(月) 10:00 - 02/06(日) 23:59</dd>
        <dt>アーカイブ視聴期間</dt>
        <dd>2022/02/13(日) 23:59 まで</dd>
      </dl>
      <div>※チケット代(3,500円)に別途システム利用料(220円)が必要となります。</div>
    </Box>
  );
};

const ConcertTicket = params => {
  return (
    <Box>
      {concert.map(({ id, name, url }) => (
        <HStack as="li" width="full" border="1px solid #efefef" borderRadius="10px" mb="30px">
          <Box textAlign="center" pl="50px">
            <Link href={`http://localhost:3000/my/lists/ticket/${id}`}>
              <a>
                <Image src={url} width="200px" />
              </a>
            </Link>
          </Box>
          <Link href={`http://localhost:3000/my/lists/ticket/${id}`}>
            <a>
              <TicketDetail key={name} name={name} />
            </a>
          </Link>
        </HStack>
      ))}
    </Box>
  );
};

export default ConcertTicket;
