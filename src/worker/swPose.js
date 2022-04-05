/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */

self.onmessage = function (e) {
  console.info('in worker');
  console.log('aPose', aPose);
  self.postMessage('adsad');
};
