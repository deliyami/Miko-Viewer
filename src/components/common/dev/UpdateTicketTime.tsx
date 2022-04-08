import { Box, Button, Heading, HStack, Input } from '@chakra-ui/react';
import { toastLog } from '@src/helper';
import { axiosI } from '@src/state/fetcher';
import dayjs from 'dayjs';
import produce from 'immer';
import React, { FC, useState } from 'react';

// TODO  콘서트 시간 갱신
export const UpdateTicketTime: FC = () => {
  const property = ['saleStartDate', 'saleEndDate', 'concertStartDate', 'concertEndDate', 'archiveEndTime'];
  const [addMinutes, setAddMinutes] = useState([undefined, undefined, 0, 10, 100]);
  const [ticketId, setTicketId] = useState(1);
  const handleUpdateTicketData = async () => {
    const updateData = {};
    const now = dayjs();
    addMinutes.forEach((m, idx) => {
      if (m || m === 0) {
        updateData[property[idx]] = now.add(m, 'm').unix();
      }
    });
    const { data } = await axiosI.patch('/tickets/' + ticketId, updateData);
    if (data) {
      toastLog('success', 'ticket updated!');
    }
  };

  const handleUpdateMinutes = (m: string, idx: number) => {
    // - 전환
    let v = m;
    if (v.slice(-1) === '-') {
      if (v.slice(0, 1) === '-') {
        v = v.slice(1, -1);
      } else {
        v = '-' + v.slice(0, -1);
      }
    }

    //  문자열 방지
    const value = parseInt(v === '' ? '0' : v, 10);
    if (Number.isNaN(value)) {
      return;
    }
    setAddMinutes(
      produce(draft => {
        draft[idx] = value;
      }),
    );
  };

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading fontSize="sm">ticket id</Heading>
        <Input placeholder="minute" w="28" value={ticketId} onChange={e => setTicketId(parseInt(e.target.value))} />
      </HStack>
      {property.map((key, idx) => (
        <HStack key={key} justifyContent="space-between">
          <Heading fontSize="sm">{key}</Heading>
          <Input placeholder="minute" w="28" value={addMinutes[idx]} onChange={e => handleUpdateMinutes(e.target.value, idx)} />
        </HStack>
      ))}
      <Button onClick={handleUpdateTicketData}>Update</Button>
    </Box>
  );
};
