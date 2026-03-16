import { useEffect, useRef } from 'react';
import api from '../utils/api.js';

export default function GoogleLoginButton({ onSuccess, onError }) {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!window.google || !btnRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback:  handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(btnRef.current, {
      theme:  'outline',
      size:   'large',
      width:  '100%',
      text:   'continue_with',
      shape:  'rectangular',
      logo_alignment: 'left',
    });
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const { data } = await api.post('/auth/google', {
        credential: response.credential,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',  JSON.stringify(data));
      onSuccess(data);
    } catch (err) {
      onError(err.response?.data?.message || 'Google sign-in failed');
    }
  };

  return (
    <div className="w-full">
      {/* Google's own rendered button */}
      <div ref={btnRef} className="w-full flex justify-center" />
    </div>
  );
}