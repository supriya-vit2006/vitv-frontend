export const saveUserSession = (token, user) => {
  localStorage.setItem('vitTravelToken', token);
  localStorage.setItem('vitTravelUser', JSON.stringify(user));
};

export const clearUserSession = () => {
  localStorage.removeItem('vitTravelToken');
  localStorage.removeItem('vitTravelUser');
};

export const getUser = () => {
  const user = localStorage.getItem('vitTravelUser');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem('vitTravelToken');