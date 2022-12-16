export const logoutEvent = new CustomEvent('logout');

export const accessTokenStorage = {
  set: (accessToken) => localStorage.setItem('accessToken', accessToken),
  get: () => localStorage.getItem('accessToken'),
  clear: () => localStorage.removeItem('accessToken'),
};
