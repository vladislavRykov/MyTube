import React, { useEffect } from 'react';
import { google } from 'googleapis';

const AuthorizationPage = () => {
  useEffect(() => {
    console.log(Boolean(NaN));
    if (!NaN) console.log(123);
    isNaN;
    // const oauth2Client = new google.auth.OAuth2(
    //   '635582800285-nfku6srq86jhbt8o8ca6nfnt720m9hcl.apps.googleusercontent.com',
    //   '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',
    //   'https://localhost:3000',
    // );
    // oauth2Client.setCredentials({
    //   access_token: 'YOUR_ACCESS_TOKEN',
    //   refresh_token: 'YOUR_REFRESH_TOKEN',
    // });
    // console.log(oauth2Client);
    // const youtube = google.youtube({
    //   version: 'v3',
    //   auth: oauth2Client,
    // });
    // (async () => {
    //   const response = await youtube.videos.rate({
    //     id: 'VIDEO_ID',
    //     rating: 'like',
    //   });
    //   console.log(response);
    // })();
  }, []);
  return <div>AuthorizationPage</div>;
};

export default AuthorizationPage;
