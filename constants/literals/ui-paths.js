
export const authUIPaths = {
  login: "/login",
  empSignup: "/emp-signup",
  adminSignup: "/admin-signup",
};

export const appTabsUIPaths = {
  dashboard: "/dashboard",
  applyLeave: "/dashboard/apply-leave",
  leaveBalance: "/dashboard/leave-balance",
  leaveHistory: "/dashboard/leave-history",
  empDetails: "/dashboard/emp-details",
  pendingLeaveReqs: "/dashboard/pending-leave-reqs",
  manageLeaveBalance: "/dashboard/manage-leave-balance",
};

export const roleRoutes = {
  admin: [
    '/dashboard/emp-details',
    '/dashboard/pending-leave-reqs',
    '/dashboard/manage-leave-balance',
  ],
  employee: [
    '/dashboard/apply-leave',
    '/dashboard/leave-balance',
    '/dashboard/leave-history',
  ],
};
