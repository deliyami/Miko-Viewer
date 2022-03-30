import React, { useEffect } from 'react';
import { Box, Image } from '@chakra-ui/react';
// declare global{
//     interface Window{
//         Kakao: object;
//     }
// }
const KakaoShareButton = () => {
  useEffect(() => {
    createKakaoButton();
  }, []);
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init('e5a20ee967b726904571b9eb3c4db540');
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '콘서트 결과',
          description: '#과연 몇등일까요?',
          imageUrl: 'IMAGE_URL', // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };
  return (
    <Box id="kakao-link-btn" cursor={'pointer'} w={'10%'} h={'50%'}>
      <Image boxSize={'full'} src="/image/snsLogo/KakaoTalk_logo.svg"></Image>
    </Box>
  );
};
export default KakaoShareButton;
