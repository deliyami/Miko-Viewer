import { FC, FormEventHandler, ReactNode } from 'react';

const RootEventCatchLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const handleOnChangeBubble: FormEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnKeyUpBubble: FormEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onChange={handleOnChangeBubble} onKeyUp={handleOnKeyUpBubble}>
      {children}
    </div>
  );
};

export default RootEventCatchLayout;
