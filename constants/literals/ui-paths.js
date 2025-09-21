
export const authUIPaths = {
  login: "/login",
  empSignup: "/emp-signup",
  adminSignup: "/admin-signup",
};

export const appTabsUIPaths = {
  dashboard: "/dashboard",
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
