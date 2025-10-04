// constants/literals/sidebar.js
import { getCookieServer } from "@/utils/cookies/server-cookies";

export const getSidebarItemsSSR = async () => {
  // Optionally pass cookies from the request for SSR
  const role = await getCookieServer("role");
  const isAdmin = role === "admin";

  const empRootSidebarItems = [
    {
      title : "Employee",
      url   : "#"
    },
    {
      title : "Apply Leave",
      url   : "/dashboard/apply-leave",
      icon  : { src: "/sidebar-icons/id-card-lanyard.svg", alt: "apply leave", width: 20, height: 20 }
    },
    {
      title : "Leave Balance",
      url   : "/dashboard/leave-balance",
      icon  : { src: "/sidebar-icons/circle-ellipsis.svg", alt: "Leave Balance", width: 20, height: 20 }
    },
    {
      title : "Leave History",
      url   : "/dashboard/leave-history",
      icon  : { src: "/sidebar-icons/square-chart-gantt.svg", alt: "Leave History", width: 20, height: 20 }
    },
  ];

  const adminRootSidebarItems = [
    {
      title : "Admin User",
      url   : "#"
    },
    {
      title : "Employee Details",
      url   : "/dashboard/emp-details",
      icon  : { src: "/sidebar-icons/book-user.svg", alt: "ID card", width: 20, height: 20 }
    },
    {
      title : "Pending Leave Requests",
      url   : "/dashboard/pending-leave-reqs",
      icon  : { src: "/sidebar-icons/calendar-clock.svg", alt: "Pending Leave Requests", width: 20, height: 20 }
    },
    {
      title : "All Leave Requests",
      url   : "/dashboard/all-leave-reqs",
      icon  : { src: "/sidebar-icons/list-check.svg", alt: "All Leave Requests", width: 20, height: 20 }
    },
  ];

  const rootSidebarItems = isAdmin ? adminRootSidebarItems : empRootSidebarItems;

  const logoutSidebarItem = {
    title: isAdmin ? "Admin Logout" : "Employee Logout",
    url: "/api/logout",
    icon: { src: "/sidebar-icons/log-out.svg", alt: "Logout", width: 20, height: 20 },
    isExternal: true
  };

  return { rootSidebarItems, logoutSidebarItem };
};
