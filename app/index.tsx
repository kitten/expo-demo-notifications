import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';

import {
  registerForNotifications,
  sendPushNotification,
} from '../lib/notifications';

export default function App() {
  useEffect(() => {
    registerForNotifications();
  }, []);

  const onSendNotification = () => {
    sendPushNotification();
  };

  return (
    <View style={styles.container}>
      <Button
        title="Send Notification"
        onPress={onSendNotification}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
