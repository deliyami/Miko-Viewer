import { ComponentProps, Suspense, useEffect, useState } from 'react';

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default function SSRSuspense(props: ComponentProps<typeof Suspense>) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense fallback={props.fallback}>{props.children}</Suspense>;
  }
  return <>{props.fallback}</>;
}
