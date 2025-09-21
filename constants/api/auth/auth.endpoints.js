import { API_BASE_URL } from "@/config/api-domain";

const authEndpoints = {
  login: `${API_BASE_URL}/api/auth/login`,
  signup: `${API_BASE_URL}/api/auth/register`,
  logout: `${API_BASE_URL}/api/auth/logout`,
}

export default authEndpoints;