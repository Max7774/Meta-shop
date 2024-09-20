export const getStoreLocal = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};

export const setLocalStorage = (name: string, value: any) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(name, JSON.stringify(value));
  }
};
