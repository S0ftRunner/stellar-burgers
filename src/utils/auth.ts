import { deleteCookie, setCookie } from "./cookie";

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';


export function setUserTokens(refreshToken: string, accessToken: string) {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);

  setCookie(ACCESS_TOKEN, accessToken);
}


export function removeUserTokens() {
  localStorage.removeItem(REFRESH_TOKEN);
  deleteCookie(ACCESS_TOKEN);
}