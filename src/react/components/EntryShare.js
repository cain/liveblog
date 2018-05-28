import React from 'react';
import PropTypes from 'prop-types';


const EntryShare = ({ entry }) => {
  const shareTwitter = (event) => {
    const story = document.querySelector(`.liveblog-entry-class-${entry.id}`);
    const postLink = story.querySelector('.liveblog-meta-time').getAttribute('href');
    const postId = entry.id;
    const left = (screen.width / 2) - 300;
    const top = (screen.height / 2) - 175;
    const options = `width=600,height=350,location=yes,status=yes,top=${top}, left=${left}`;
    let description = story.querySelector('.liveblog-entry-content').innerText.trim();

    event.preventDefault();

    // truncate post
    if (description.length > (280 - postLink.length - 2)) {
      description = `${description.substr(0, 280 - postLink.length - 3)} …`;
    }
    const text = encodeURIComponent(`${description} ${postLink} `);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;

    window.open(shareUrl, postId, options);

    return false;
  };

  const shareFacebook = () => {
    const story = document.querySelector(`.liveblog-entry-class-${entry.id}`);
    const postLink = story.querySelector('.liveblog-meta-time').getAttribute('href');
    const postId = entry.id;
    const left = (screen.width / 2) - 300;
    const top = (screen.height / 2) - 175;
    const options = `width=600,height=350,location=yes,status=yes,top=${top}, left=${left}`;

    event.preventDefault();

    const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(postLink)}`;

    window.open(shareUrl, postId, options);

    return false;
  };

  const shareEmail = () => {
    const story = document.querySelector(`.liveblog-entry-class-${entry.id}`);
    const postLink = story.querySelector('.liveblog-meta-time').getAttribute('href');

    event.preventDefault();

    const shareUrl = `mailto:?subject=title&body=${postLink}`;

    window.open(shareUrl);

    return false;
  };

  const shareWhatsapp = () => {
    const story = document.querySelector(`.liveblog-entry-class-${entry.id}`);
    const postLink = story.querySelector('.liveblog-meta-time').getAttribute('href');

    event.preventDefault();

    const shareUrl = `whatsapp://send?text=${postLink}`;

    window.open(shareUrl);

    return false;
  };

  /* eslint max-len: 0 */
  return (
    <div className="liveblog-share" id={`liveblog-update-${entry.id}-share`}>
      <button className="share-social share-facebook " onClick={shareFacebook}>
        <span data-no-canvas="false">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>social-facebook_circle</title>
            <g fill="#3A5795" fillRule="evenodd">
              <path d="M16 32C7.162 32 0 24.838 0 16 0 7.162 7.162 0 16 0c8.838 0 16 7.162 16 16 0 8.838-7.162 16-16 16zm0-2.594c7.405 0 13.406-6 13.406-13.406 0-7.405-6-13.406-13.406-13.406-7.405 0-13.406 6-13.406 13.406 0 7.405 6 13.406 13.406 13.406z" fillRule="nonzero"></path>
              <path d="M19.172 16.555h-2.317V24.5h-3.31v-7.945H12v-2.869h1.545V11.81c0-1.324.662-3.31 3.42-3.31h2.538v2.759h-1.765c-.331 0-.662.11-.662.772v1.655h2.538l-.442 2.87z" fillRule="nonzero"></path>
            </g>
          </svg>
        </span>
      </button>
      <button className="share-social share-twitter " onClick={shareTwitter}>
        <span data-no-canvas="false">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>social-twitter_circle</title>
            <g fill="#55ACEE" fillRule="evenodd">
              <path d="M16 32C7.162 32 0 24.838 0 16 0 7.162 7.162 0 16 0c8.838 0 16 7.162 16 16 0 8.838-7.162 16-16 16zm0-2.594c7.405 0 13.406-6 13.406-13.406 0-7.405-6-13.406-13.406-13.406-7.405 0-13.406 6-13.406 13.406 0 7.405 6 13.406 13.406 13.406z" fillRule="nonzero"></path>
              <path d="M24.252 13.567v.46c0 4.834-4.142 10.473-11.623 10.473-2.301 0-4.488-.575-6.329-1.611h.92c1.957 0 3.683-.576 5.064-1.611-1.841 0-3.337-1.036-3.798-2.532.23 0 .46.115.806.115.345 0 .806 0 1.15-.115-1.84-.345-3.221-1.841-3.221-3.567 0 .23 1.15.46 1.726.46-1.151-.69-1.841-1.841-1.841-3.107 0-.69.23-1.266.575-1.842 2.071 2.187 5.063 3.683 8.4 3.798-.114-.23-.114-.575-.114-.805 0-2.072 1.84-3.683 4.143-3.683 1.15 0 2.301.46 2.992 1.15.92-.114 1.84-.46 2.646-.92-.345.806-.92 1.611-1.84 2.072.805-.115 1.61-.23 2.3-.576a6.024 6.024 0 0 1-1.956 1.841z"></path>
            </g>
          </svg>
        </span>
      </button>
      <button className="share-social share-email" onClick={shareEmail}>
        <span className="social-icon">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>social-email_circle</title>
            <g fill="#232323" fillRule="evenodd">
              <path d="M16 32C7.162 32 0 24.838 0 16 0 7.162 7.162 0 16 0c8.838 0 16 7.162 16 16 0 8.838-7.162 16-16 16zm0-2.594c7.405 0 13.406-6 13.406-13.406 0-7.405-6-13.406-13.406-13.406-7.405 0-13.406 6-13.406 13.406 0 7.405 6 13.406 13.406 13.406z" fillRule="nonzero"></path>
              <path d="M16 16.143L7.117 11h17.766L16 16.143zM7.705 21.1h16.6l-4.151-5.604L16 17.9l-4.082-2.363-4.213 5.561zm3.722-5.845L7 12.69v8.41h.016l4.412-5.845zM24.988 21.1H25v-8.41l-4.357 2.523 4.345 5.886z">
              </path>
            </g>
          </svg>
        </span>
      </button>
      <button className="share-social share-whatsapp" onClick={shareWhatsapp}>
        <span
          className="social-icon">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>social-whatsapp_circle</title>
            <g fill="#5AB137" fillRule="evenodd">
              <path d="M16 32C7.162 32 0 24.838 0 16 0 7.162 7.162 0 16 0c8.838 0 16 7.162 16 16 0 8.838-7.162 16-16 16zm0-2.594c7.405 0 13.406-6 13.406-13.406 0-7.405-6-13.406-13.406-13.406-7.405 0-13.406 6-13.406 13.406 0 7.405 6 13.406 13.406 13.406z" fillRule="nonzero"></path>
              <path d="M16.116 8c-4.353 0-7.882 3.57-7.882 7.974 0 2.186 1.144 4.139 1.144 4.139L8 24.359l4.318-1.396s1.604.984 3.798.984c4.354 0 7.884-3.57 7.884-7.974C24 11.57 20.47 8 16.116 8zm0 14.671c-2.027 0-3.65-1.108-3.65-1.108l-2.488.823.808-2.438s-1.291-1.808-1.291-3.975c0-3.698 2.964-6.696 6.621-6.696 3.657 0 6.622 2.998 6.622 6.697s-2.965 6.697-6.622 6.697zm-3-10.169s.212-.137.323-.137h.62s.167.03.244.206c.076.175.6 1.42.639 1.515.039.097.14.334-.023.548-.163.212-.504.609-.504.609s-.135.124-.018.32c.116.194.527.84 1.066 1.329.538.487 1.197.846 1.526.955.328.11.4-.036.526-.2.126-.163.518-.663.518-.663s.135-.202.4-.078c.265.123 1.558.755 1.558.755s.157.028.166.205c.009.177.117.71-.351 1.219-.47.512-1.465.749-1.936.615-.47-.134-2.03-.546-3.046-1.505-1.017-.96-1.84-1.968-2.176-2.712-.337-.743-.317-1.185-.3-1.394.02-.207.128-1.172.765-1.585l.002-.002z">
              </path>
            </g>
          </svg>
        </span>
      </button>
    </div>
  );
};

EntryShare.propTypes = {
  entry: PropTypes.object,
};

export default EntryShare;
