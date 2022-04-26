const hideChatSetTimeOut: { [key: string]: NodeJS.Timeout } = {};

const showChatToRoom = (id: string, text: string, time: number = 2) => {
  const chatDiv = document.getElementById(id + 'chat') as HTMLElement;
  chatDiv.innerText = text;

  clearTimeout(hideChatSetTimeOut[id]);
  const timerId = setTimeout(() => {
    chatDiv.innerText = '';
  }, time * 1000);
  hideChatSetTimeOut[id] = timerId;
};

export { showChatToRoom };
