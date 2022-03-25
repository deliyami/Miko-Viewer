// NOTE 일부 "undefined"로 저장되는 경우가 있었음.
import { AtomEffect } from 'recoil';

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      // 만약 undefined등의 값일 경우 에러 핸들링
      try {
        const parsed = JSON.parse(savedValue);
        setSelf(parsed);
      } catch {
        setSelf(undefined);
      }
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else if (newValue) {
        // NOTE undefined의 경우 "undefined"로 저장되는 버그 수정
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        localStorage.removeItem(key);
      }
    });
  };
