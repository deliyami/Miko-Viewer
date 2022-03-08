import {
    Box, Image
} from '@chakra-ui/react';

const posterList = [
    { name: '방탄소년단', show: true, url: 'http://file6.instiz.net/data/cached_img/upload/2016/03/21/0/6d295bb95b9a85accddc49640327f174.jpg' },
];

const Carousel = (params) => {
    return (
        <Box>
            {/* <Link href=""> */}
            {posterList.map(({ name, show, url }) => (
                <Image
                    width="100%"
                    objectFit="cover"
                    height="350px"
                    objectPosition="0px -1200px"
                    src={url}
                    alt={name}
                />
            ))}
            {/* </Link> */}
        </Box>
    );
};

export default Carousel;
