/* eslint-disable @typescript-eslint/no-explicit-any */
export const getContentType = (type: "JSON" | "FormData" | "URLEncoded") => {
  if (type === "JSON") {
    return { "Content-Type": "application/json" };
  } else if (type === "FormData") {
    return { "Content-Type": "multipart/form-data" };
  } else if (type === "URLEncoded") {
    return { "Content-Type": "application/x-www-form-urlencoded" };
  }
};

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === "object"
      ? message[0]
      : message
    : error.message;
};
