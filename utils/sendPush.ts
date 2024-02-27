 // utils/sendPush.ts
import axios from "axios";


export const sendPush = async ( userId:string , bubbleMessage:string ): Promise<void> => {

  const title = `${userId}을 위한 알림`;
  const body = bubbleMessage;
  const message = { data: { title, body, userId } };

  try {
    const response = await axios.post(`${window?.location?.origin}/api/send-fcm`, { message });
    console.log("RESPONSE:", response.data);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};