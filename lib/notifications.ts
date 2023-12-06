import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { getBaseURL } from './constants';

Notifications.setNotificationHandler({
  async handleNotification() {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

let token: Notifications.ExpoPushToken | void;

export async function registerForNotifications() {
  if (token) {
    return token;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!Device.isDevice) {
    return alert('Must use physical device for Push Notifications');
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  } else if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  return token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas?.projectId,
  });
}

export async function sendPushNotification() {
  const token = await registerForNotifications();
  if (!token) {
    return;
  }

  await fetch(`${getBaseURL()}/notification`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token.data,
      message: 'Example Notification',
    }),
  });
}
