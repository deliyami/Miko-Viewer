import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import BasicLayout from '@src/layout/BasicLayout';
const pay = ()=>{
    return(
        <Box>pay</Box>
    )
}

export default pay;

pay.getLayout = function getLayout(page:ReactElement){
    return (
        <BasicLayout>{page}</BasicLayout>
    )
}