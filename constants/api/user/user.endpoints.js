import { NEXT_PUBLIC_API_BASE_URL } from "@/config/api-domain";

const userEndpoints = {
  getCurrentUser: `${NEXT_PUBLIC_API_BASE_URL}/api/user/me`,
}

export default userEndpoints;