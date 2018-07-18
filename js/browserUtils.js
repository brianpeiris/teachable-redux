const ua = navigator.userAgent;
export default {
  isMobile: /like mac os x/i.test(ua) || /android/i.test(ua),
  isSafari: /safari/i.test(ua) && !/chrome/i.test(ua)
};
