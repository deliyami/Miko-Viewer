import { Button } from "@chakra-ui/react";
import { axiosI } from "@src/state/fetcher";
import { useUser } from "@src/state/swr/useUser";
import { useRouter } from "next/router";

const LogoutBtn = () => {
  const router = useRouter();
  const { mutate } = useUser();
  const logoutHandler = async () => {
    const isLogoutSuccess = await axiosI.get<boolean>("/logout");

    if (isLogoutSuccess) {
      // NOTE mutate와 null의 순서가 반대일 경우
      // user 데이터가 필요한 페이지에서 에러가 발생할 가능성이 있음.
      router.push("/");
      mutate(null, { revalidate: false });
    }
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutBtn;
