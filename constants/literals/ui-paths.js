
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
  allLeaveReqs: "/dashboard/all-leave-reqs",
};

export const roleRoutes = {
  admin: [
    '/dashboard/emp-details',
    '/dashboard/pending-leave-reqs',
    '/dashboard/all-leave-reqs',
  ],
  employee: [
    '/dashboard/apply-leave',
    '/dashboard/leave-balance',
    '/dashboard/leave-history',
  ],
};
