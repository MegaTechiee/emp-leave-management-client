
export const getCookieValueClient = (name)=> {
  if (typeof document === 'undefined') return undefined;
  const regex = new RegExp('(^| )' + name + '=([^;]+)');
  const match = regex.exec(document.cookie);
  return match ? match[2] : undefined;
};

export const setCookieClient = (name, value, maxAgeSeconds = 60) => {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}`;
};

export const deleteCookieClient = (name) => {
  document.cookie = `${name}=; path=/; max-age=0`;
}
