import Constants from 'expo-constants';

export function getBaseURL() {
  if (Constants.debugMode) {
    const source = (global as any).nativeModuleProxy?.SourceCode;
    if (typeof source?.scriptURL === 'string') {
      const scriptUrl = new URL(source?.scriptURL);
      return `${scriptUrl.protocol}//${scriptUrl.host}`;
    }
  }

  return process.env.EXPO_PUBLIC_API_URL;
}

