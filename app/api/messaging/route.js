import axios from 'axios';
import qs from 'qs';

export async function POST(req, res) {
  const { phone, message } = await req.json();

  const data = qs.stringify({
    'token': process.env.NEXT_PUBLIC_ULTRAMSG_TOKEN,
    'to': phone,
    'body': message,
  });

  const config = {
    method: 'post',
    url: `https://api.ultramsg.com/${process.env.NEXT_PUBLIC_ULTRAMSG_INSTANCE_ID}/messages/chat`,
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return new Response(JSON.stringify({ success: true, data: response.data }), { status: 200 });
  } catch (error) {
    console.error('Error sending message:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}


// import axios from 'axios';

// export async function POST(req) {
//   try {
//     const { phones, message } = await req.json();

//     // Ensure phones is an array
//     if (!Array.isArray(phones)) {
//       return new Response('Phone numbers should be an array.', { status: 400 });
//     }

//     // Send message to each phone number
//     const sendMessages = phones.map((phone) => {
//       return axios.post(`https://api.ultramsg.com/instance/messages/chat`, {
//         token: process.env.ULTRAMSG_TOKEN,
//         to: phone,
//         body: message,
//       });
//     });

//     // Wait for all messages to be sent
//     await Promise.all(sendMessages);

//     return new Response('Messages sent successfully!', { status: 200 });
//   } catch (error) {
//     console.error('Error sending messages:', error);
//     return new Response('Failed to send messages.', { status: 500 });
//   }
// }
