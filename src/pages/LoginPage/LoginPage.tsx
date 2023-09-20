import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { instance } from '../../services/api/api';
import { useSearchParams } from 'react-router-dom';

const LoginPage = () => {
  const onSuccessHandler = (res: any) => {
    console.log(res);
  };
  const getToken = () => {
    instance
      .post('https://oauth2.googleapis.com/token', {
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        client_id: process.env.REACT_APP_CLIENT_ID,
        code: localStorage.getItem('code'),
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000',
      })
      .then((res) => {
        localStorage.setItem('token', `${res.data.token_type} ${res.data.access_token}`);
        localStorage.setItem('code', res.data.refresh_token);
      })
      .catch((err) => console.log(localStorage.getItem('code')));
  };
  const like = (res: any) => {
    instance.post(
      'https://www.googleapis.com/youtube/v3/videos/rate',
      {},
      {
        params: {
          id: 'UvMmaOzKeys',
          rating: 'like',
        },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );
  };
  const getCode = () => {
    instance
      .get('https://accounts.google.com/o/oauth2/v2/auth', {
        params: {
          client_id: '635582800285-nfku6srq86jhbt8o8ca6nfnt720m9hcl.apps.googleusercontent.com',
          redirect_uri: 'http://localhost:3000',
          response_type: 'code',
          scope: 'https://www.googleapis.com/auth/youtube',
          access_type: 'offline',
          prompt: 'consent',
        },
        headers: {
          'Access-Control-Allow-Origin': 'https://localhost:3000',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <GoogleLogin onSuccess={onSuccessHandler} onError={() => console.log('err')} />
      <button style={{ padding: '30px', marginRight: '10px' }} onClick={like}>
        Поставить лайк https://www.youtube.com/watch?v=UvMmaOzKeys
      </button>
      <button style={{ padding: '30px', marginRight: '10px' }} onClick={getToken}>
        Поличить токен
      </button>
      <button style={{ padding: '30px' }} onClick={getCode}>
        Получить code
      </button>
    </div>
  );
};

export default LoginPage;
