import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Footer from '@src/components/home/Footer';
import MenuBar from '@src/components/home/MenuBar';

const TicketDate = () => {
  return (
    <Box textAlign="center" width="98px">
      <Text textStyle="h6">2022</Text>
      <Text textStyle="h4" >01/29</Text>
      <Text textStyle="h6" >(土)</Text>
      <Text textStyle="sub" >19:00</Text>
    </Box>
  );
};

const TicketDetail = () => {
  return (
    <Box flex="1 1 auto" padding="20px 0 24px">
      <div>
        <Box as="span" backgroundColor="#638dff"  borderRadius="2px"  fontSize="10px"  fontWeight="bold"  color="white" >販売中</Box>
      </div>
      <div>
        <a href="https://viewing.live.line.me/channels/6104428/upcoming/18486965">
          配信チケット
        </a>
      </div>
      <dl>
        <dt>販売期間</dt>
        <dd>2022/01/24(月) 10:00 - 02/06(日) 23:59</dd>
        <dt>アーカイブ視聴期間</dt>
        <dd>2022/02/13(日) 23:59 まで</dd>
      </dl>
      <div>
        ※チケット代(3,500円)に別途システム利用料(220円)が必要となります。
      </div>
    </Box>
  );
};

const TicketPrice = () => {
  return (
    <Box display="flex" alignItems="center">
      <div>
        <div>¥3,721</div>
      </div>
      <button>購入</button>
    </Box>
  );
};

const TicketBox = () => {
  return (
    <HStack as="li" width="full" border="1px solid #efefef" borderRadius="10px" >
      <TicketDate />
      <TicketDetail />
      <TicketPrice />
    </HStack>
  );
};

const LiveInformation = () => {
  return (
      <Box  maxW="359px" pr="20px">
        <Box mb="20px">
          <img
            src="https://obs.line-scdn.net/0hxM4jlR2XJ2IJEzC38b1YNVlOIRVwPT1zbWtuVy0VKlQlImhnYnQ_BSoQfAVxJ2RkYnZqBSQXegItd2AzN31oBCURelokKzU0N3NgA2kSLQZzIzJgPQ/f375x375"
            srcSet="
          https://obs.line-scdn.net/0hxM4jlR2XJ2IJEzC38b1YNVlOIRVwPT1zbWtuVy0VKlQlImhnYnQ_BSoQfAVxJ2RkYnZqBSQXegItd2AzN31oBCURelokKzU0N3NgA2kSLQZzIzJgPQ/f640x640 2x
        "
            alt="ディズニー・オン・クラシック ～まほうの夜の音楽会 2021"
          />
        </Box>
        <div>
          <div>ディズニー・オン・クラシック</div>
          <div>ディズニー・オン・クラシック ～まほうの夜の音楽会 2021</div>
          <div>2022/01/29(土)</div>
          <div>
            <input id="show_more" type="checkbox" />
            <div>
              <div>
                ディズニー・アニメーションや映画・テーマパークの音楽を、オーケストラとヴォーカリストの生演奏でお届けする、大人のための音楽会。
                <br />
                「ディズニー・オン・クラシック」で初めて『リメンバー・ミー』を全編フィーチャー。その他、『ヘラクレス』より「ゴー・ザ・ディスタンス」、実写版『美女と野獣』より「時は永遠に」、ミュージカル版『アラジン』より「プラウド・オブ・ユア・ボーイ」など、音楽が持つ、心が震えるような力を存分に味わえる楽曲を、映像と照明演出とともにお贈りします。
                <br />
                <br />
                さらに、映像配信では全国ツアー51公演の中で8公演のみでパフォーマンスされた「ミステリアス＆ダーク・スペシャル」プログラムも特別収録！
                <br />
                東京ディズニーシー(R)「ディズニー・ハローウィーン
                2017」より“ザ・ヴィランズ・ワールド”（エディット・バージョン）や『ノートルダムの鐘』より「罪の炎」、『101匹わんちゃん』より「町のクルエラ」など、限定プログラムをお見逃しなく！
              </div>
              <label htmlFor="show_more">
                <span>閉じる</span>
              </label>
            </div>
          </div>
        </div>
      </Box>
    
  );
};

const LiveDetailPage = () => {
  return (
    <>
      <MenuBar></MenuBar>
    <HStack justifyContent="space-between" py="40px" px="20px">
      <LiveInformation />
      <VStack width="full"  alignItems="flex-start">
        <Text as="h2" textStyle="h2" mb="20px" >チケット一覧</Text>
      <TicketBox />
      <TicketBox />
      <TicketBox />
      </VStack>
    </HStack>
    <Footer></Footer>
    </>
  );
};

export default LiveDetailPage;
