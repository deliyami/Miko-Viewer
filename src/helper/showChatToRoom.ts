import { hideChatSetTimeOut } from '@src/state/shareObject/shareObject';

const showChatToRoom = (id: string, text: string, time: number = 5) => {
  const chatDiv = document.getElementById(id + 'chat');
  chatDiv.innerText = text;

  clearTimeout(hideChatSetTimeOut[id]);
  const timerId = setTimeout(() => {
    chatDiv.innerText = '';
  }, time * 1000);
  hideChatSetTimeOut[id] = timerId;
};

export default showChatToRoom;
