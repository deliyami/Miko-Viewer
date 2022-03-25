import ErrorBoundary from '@src/components/common/ErrorBoundary';
import Loading from '@src/components/common/Loading';
import { FC } from 'react';
import { withSuspense } from './withSuspenseHOC';

const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
      <main>{children}</main>
    </ErrorBoundary>
  );
};

const CustomLoading: FC = () => {
  return <Loading></Loading>;
};

export default withSuspense(Layout, CustomLoading);
