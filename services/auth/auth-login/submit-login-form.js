import { postAPIClient } from "@/lib/api/http-methods-client";

export const loginFormSubmit = async (loginDetails) => {
  const res = await postAPIClient('/api/login', loginDetails)
  const data = await res.json();

  return data;
};

