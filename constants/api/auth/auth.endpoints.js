import { NEXT_SERVER_API_BASE_URL } from "@/config/api-domain";

const authEndpoints = {
  login: `${NEXT_SERVER_API_BASE_URL}/api/auth/login`,
  signup: `${NEXT_SERVER_API_BASE_URL}/api/auth/register`,
  logout: `${NEXT_SERVER_API_BASE_URL}/api/auth/logout`,
}

export default authEndpoints;