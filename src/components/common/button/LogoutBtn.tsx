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
      router.push("/");
      setTimeout(() => {
        mutate(null, { revalidate: false });
      }, 0);
    }
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutBtn;
