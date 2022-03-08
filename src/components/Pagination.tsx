import { Box, Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';


const Pagination = ({ data }) => {

    console.log(data.meta);
    const links = data.meta.links;
    const router = useRouter();
    const pageChange = (url) => {
        router.push(`/concerts?page=${url}`);
    }
    return (
        <Box>
            <HStack>
                {links.length > 3 && (links?.map((link, key) => (
                    <>
                        {link.url === null ?
                            <Button disabled key={key}>{link.label}</Button> : <Button onClick={() => pageChange(link.url)}>{link.label}</Button>}
                    </>
                )))}
            </HStack>
        </Box >
    );
};

export default Pagination;
