import { useState } from 'react';

function AttendancePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendMessage() {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/messaging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // phone: ['+91 8431505451', '+91 8050063126', '+91 9449294000', ],
        phone: '+91 8296817008',
        message: 'Your child is absent today. \n\n From Flione Tech solutions ',
      }),
    });

    // const response = await fetch('/api/messaging', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     phones: ['+91 8050063126', '+91 9876543210'], // Array of recipient phone numbers
    //     message: 'Your child was absent today.',
    //   }),
    // });
    

    const data = await response.json();
    if (data.success) {
      console.log('Message sent successfully:', data.data);
    } else {
      console.error('Failed to send message:', data.error);
      setError('Failed to send message.');
    }

    setLoading(false);
  }

  return (
    <div>
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send Absence Notification'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AttendancePage;
