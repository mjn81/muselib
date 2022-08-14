const ACESS_TOKEN = 'ACCESS_TOKEN';
const USERNAME = 'USER_NAME';
export const setUser = (
  token: string,
  username: string
): void => {
  localStorage.setItem(ACESS_TOKEN, token);
  localStorage.setItem(USERNAME, username);
};

export const getToken = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(ACESS_TOKEN) ?? '';
};

export const removeToken = (): string => {
  if (typeof window === 'undefined') return '';
  const token = localStorage.getItem(ACESS_TOKEN);
  localStorage.removeItem(ACESS_TOKEN);
  return token ?? '';
};
