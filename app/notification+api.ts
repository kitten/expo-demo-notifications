import { ExpoPushMessage, Expo } from "expo-server-sdk";

const expo = new Expo();

export async function POST(req: Request) {
  const body = await req.json();
  const token = body?.token;
  const message = body?.message;
  if (typeof token !== 'string' || typeof message !== 'string') {
    return new Response('Invalid body shape', {
      status: 400,
    });
  } else if (!Expo.isExpoPushToken(token)) {
    return new Response('Invalid Expo push token', {
      status: 400,
    });
  }

  const notification: ExpoPushMessage = {
    to: token,
    sound: "default",
    body: message,
    data: { withSome: "data" },
  };

  try {
    const results = await expo.sendPushNotificationsAsync([notification]);
    return Response.json(results[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error sending notification", {
      status: 500,
    });
  }
}
