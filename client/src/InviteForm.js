// frontend/src/InviteForm.js
import { useState } from 'react';
import axios from 'axios';

export default function InviteForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus('');
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/send-invite`,
        { toEmail: email }
      );
      setStatus(`✅ Invitation sent! Message ID: ${data.messageId}`);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Unknown error';
      setStatus(`❌ Failed: ${errMsg}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <label>Email to invite:</label>
      <input
        type="email" required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={sending}
      />
      <button type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send Invite'}
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
