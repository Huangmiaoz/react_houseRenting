import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const TOKEN_NAME = 'hkzf_token';
const ENCRYPTION_KEY = 'your-encryption-key';

// 获取token
const getToken = () => {
  const encryptedToken = Cookies.get(TOKEN_NAME);

  if (encryptedToken) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  }

  return null;
};

// 设置token
const setToken = (value, expirationTimeInMinutes = 3600) => {
  const encryptedToken = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  Cookies.set(TOKEN_NAME, encryptedToken, { expires: expirationTimeInMinutes });
};

// 删除token
const removeToken = () => {
  Cookies.remove(TOKEN_NAME);
};

// 是否登录（有权限）
const isAuth = () => !!getToken();

export { getToken, setToken, removeToken, isAuth };
