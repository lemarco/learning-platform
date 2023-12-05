export function generateRefreshToken(len) {
  // TODO: CREATE REAL REFRESHTOKEN generator
  let text = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}
