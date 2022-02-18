import { useUser } from '@src/state/swr/useUser';
import { Container } from '../components/Container';

const HomePage = () => {
  const { data } = useUser();
  console.log(data);
  return <Container height="100vh"></Container>;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default HomePage;
