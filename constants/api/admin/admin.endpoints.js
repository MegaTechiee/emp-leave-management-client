import { NEXT_PUBLIC_API_BASE_URL } from "@/config/api-domain";

const adminEndpoints = {
  getAllEmployees: `${NEXT_PUBLIC_API_BASE_URL}/api/admin/employees`,
  getEmployeeLeaveBalance: (employeeId) => `${NEXT_PUBLIC_API_BASE_URL}/api/admin/balance/${employeeId}`,
  updateEmployeeLeaveBalance: (employeeId) => `${NEXT_PUBLIC_API_BASE_URL}/api/admin/balance/${employeeId}`,
  getPendingLeaves: `${NEXT_PUBLIC_API_BASE_URL}/api/admin/leaves/pending`,
  updateLeaveRequestStatus: (leaveId) => `${NEXT_PUBLIC_API_BASE_URL}/api/admin/leaves/${leaveId}`,
  getAllLeaveRequests: `${NEXT_PUBLIC_API_BASE_URL}/api/admin/leaves/all`,
}

export default adminEndpoints;