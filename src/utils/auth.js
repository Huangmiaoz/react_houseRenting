import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const TOKEN_NAME = 'hkzf_token';
const ENCRYPTION_KEY = 'your-encryption-key';

// 获取token
const getToken = () => {
  const encryptedToken = Cookies.get(TOKEN_NAME);
  console.log('getToken', encryptedToken)
  if (encryptedToken) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log('getToken', encryptedToken, decryptedBytes, decryptedToken);
    return decryptedToken;
  }
  return null;
};

// 设置token
const setToken = (value, expirationTimeInMinutes = 3600) => {
  const encryptedToken = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  console.log('setToken', value, encryptedToken);
  Cookies.set(TOKEN_NAME, encryptedToken, { expires: expirationTimeInMinutes });
};

// 删除token
const removeToken = () => {
  Cookies.remove(TOKEN_NAME);
};

// 是否登录（有权限）
const isAuth = () => !!getToken();

export { getToken, setToken, removeToken, isAuth };



// const TOKEN_NAME = 'hkzf_token';

// // 获取token
// const getToken = () => localStorage.getItem(TOKEN_NAME);

// //设置token
// const setToken = (value) => localStorage.setItem(TOKEN_NAME, value);

// // 删除token
// const removeToken = () => localStorage.removeItem(TOKEN_NAME);

// // 是否登录（有权限）
// const isAuth = () => !!getToken();

// export { getToken, setToken, removeToken, isAuth };
