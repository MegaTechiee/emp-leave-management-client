import { NEXT_PUBLIC_API_BASE_URL } from "@/config/api-domain";

const empEndpoints = {
  applyLeave: `${NEXT_PUBLIC_API_BASE_URL}/api/employee/leaves`,
  getLeaveBalance: `${NEXT_PUBLIC_API_BASE_URL}/api/employee/balance`,
  getLeaveHistory: `${NEXT_PUBLIC_API_BASE_URL}/api/employee/history`,
}

export default empEndpoints;