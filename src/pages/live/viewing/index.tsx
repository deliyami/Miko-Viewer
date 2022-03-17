import { Container } from "@src/components/Container";
import ViewingLayout from "@src/layout/ViewingLayout";
import { curUserTicketState } from "@src/state/recoil/concertState";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";

const DynamicViewingPage = dynamic(() => import("../../../components/viewing/ViewingCSRPage"), {
  loading: () => <div> loading</div>,
  ssr: false,
});

const ViewingPage = () => {
  const userTicket = useRecoilValue(curUserTicketState);
  console.log("userTicket- viewing page", userTicket);
  return (
    <Container height="auto" width="full">
      <Script src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js" strategy="beforeInteractive" async defer />
      <DynamicViewingPage />
    </Container>
  );
};

ViewingPage.getLayout = function getLayout(page: ReactElement) {
  return <ViewingLayout>{page}</ViewingLayout>;
};

export default ViewingPage;
