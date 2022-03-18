export const setCookie = function (name: string, value: string, hours: number) {
  const date = new Date();
  date.setTime(date.getTime() + 60 * 60 * hours * 1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};
