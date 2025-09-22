import { postAPIClient } from "@/lib/api/http-methods-client";

export const empSignupFormSubmit = async (signupDetails) => {
  const res = await postAPIClient('/api/emp-signup', signupDetails)
  const data = await res.json();

  return data;
};

export const adminSignupFormSubmit = async (signupDetails) => {
  const res = await postAPIClient('/api/admin-signup', signupDetails)
  const data = await res.json();

  return data;
};


