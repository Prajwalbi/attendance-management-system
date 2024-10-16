import axios from 'axios';  // Import Axios for making HTTP requests.
import qs from 'qs';  // Import qs for formatting data as URL-encoded strings.

export async function POST(req, res) {
  // Parse incoming JSON request to extract 'phone' and 'message'.
  const { phone, message } = await req.json();

  // Prepare the data for the POST request using URL encoding.
  // The token and instance ID are fetched from environment variables for security.
  const data = qs.stringify({
    'token': process.env.NEXT_PUBLIC_ULTRAMSG_TOKEN,  // Token from environment variable.
    'to': phone,  // Recipient phone number.
    'body': message,  // The message body to be sent.
  });

  // Configuration object for the Axios POST request.
  const config = {
    method: 'post',
    url: `https://api.ultramsg.com/${process.env.NEXT_PUBLIC_ULTRAMSG_INSTANCE_ID}/messages/chat`,  // API URL with instance ID from environment variables.
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded',  // Set the content type to URL-encoded form.
    },
    data: data,  // The encoded data to be sent in the request.
  };

  try {
    // Send the POST request using Axios with the provided configuration.
    const response = await axios(config);

    // If the message is sent successfully, return a success response.
    return new Response(JSON.stringify({ success: true, data: response.data }), { status: 200 });
  } catch (error) {
    // Log any errors encountered during the request.
    console.error('Error sending message:', error);

    // Return an error response with the message.
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

