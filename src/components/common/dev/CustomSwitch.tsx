import { Flex, FormLabel, Switch } from '@chakra-ui/react';
import React, { FC } from 'react';
import { SetterOrUpdater } from 'recoil';

export const CustomSwitch: FC<{ label: string; isOn: boolean; set: SetterOrUpdater<boolean> }> = ({ isOn, label, set }) => {
  return (
    <Flex justifyContent="space-between">
      <FormLabel htmlFor={label} mb="0">
        {label}
      </FormLabel>
      <Switch id={label} isChecked={isOn} defaultChecked={isOn} onChange={() => set(prev => !prev)} />
    </Flex>
  );
};
