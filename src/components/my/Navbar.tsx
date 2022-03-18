import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { useUser } from '@src/state/swr/useUser';
import Link from 'next/link';
import { FC, Suspense } from 'react';

const MenuLink: FC<{ name: string; url: string }> = ({ name, url }) => {
    return (
        <Box
            
            as="li"
            listStyleType="none"
            fontSize="23px"
            fontWeight="bold"
            px="20px"
        >
            <Link href={url}>
                <a>{name}</a>
            </Link>
        </Box>
    );
};

const UserData = () => {
    const { data } = useUser();

    return (
        <Box>
            {data ? (
                <>
                    <HStack px="20px" spacing={15}>
                        <Image
                            borderRadius='100%'
                            boxSize='60px'
                            // objectFit="none"
                            src={S3_URL + data.avatar}
                            fallbackSrc='https://i.pinimg.com/564x/ba/7d/a2/ba7da2c7fa66b6a81d357df4a4113333.jpg'
                            alt='Dan Abramov'
                        />
                        <Box>
                            <Text
                                fontSize="20px"
                                fontWeight="bold"
                            >{data.name}</Text>
                        </Box>
                    </HStack>
                </>
            ) : (
                <MenuLink name="로그인" url="/login" />
            )}
        </Box >
    );
};

const NavBar = (params) => {

    const linkList = [
        { name: '나의 정보', url: '/my' },
        { name: '나의 정보 수정', url: '/my/edit' },
        { name: '코인 내역', url: '/my/coin' },
        { name: '티켓 내역', url: '/my/lists/1' }
    ];

    return (
        <Box position="sticky" shadow='md'>
            <VStack as="ul" width="full" alignItems="center" py="20px" spacing={20} >
                <Suspense fallback={<Text> 로딩 </Text>}>
                    <UserData />
                </Suspense>
                {linkList.map(({ name, url }) => (
                    <MenuLink key={name} name={name} url={url} />
                ))}
            </VStack>
        </Box >

    );
};

export default NavBar;
