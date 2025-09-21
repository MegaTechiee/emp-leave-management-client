import { getCookieServer } from "@/utils/cookies/server-cookies";

const isAdmin = await getCookieServer("role") == "admin";

const empRootSidebarItems = [
  {
    title: "Apply Leave",
    url: "/dashboard/apply-leave",
    icon: {
      src: "/sidebar-icons/id-card-lanyard.svg",
      alt: "apply leave icon",
      width: 20,
      height: 20
    },
  },
  {
    title: "Leave Balance",
    url: "/dashboard/leave-balance",
    icon: {
      src: "/sidebar-icons/circle-ellipsis.svg",
      alt: "Leave Balance icon",
      width: 20,
      height: 20
    },
  },
  {
    title: "Leave History",
    url: "/dashboard/leave-history",
    icon: {
      src: "/sidebar-icons/square-chart-gantt.svg",
      alt: "Leave History icon",
      width: 20,
      height: 20
    },
  },
]

const adminRootSidebarItems = [
  {
    title: "Employee Details",
    url: "/dashboard/emp-details",
    icon: {
      src: "/sidebar-icons/id-card-lanyard.svg",
      alt: "ID card icon",
      width: 20,
      height: 20
    },
  },
  {
    title: "Pending Leave Requests",
    url: "/dashboard/pending-leave-reqs",
    icon: {
      src: "/sidebar-icons/circle-ellipsis.svg",
      alt: "Pending Leave Requests icon",
      width: 20,
      height: 20
    },
  },
  {
    title: "Manage Leave Balance",
    url: "/dashboard/manage-leave-balance",
    icon: {
      src: "/sidebar-icons/square-chart-gantt.svg",
      alt: "Manage Leave Balance icon",
      width: 20,
      height: 20
    },
  },
]

export const logoutSidebarItem = {
  title: "Logout",
  url: "/api/logout", // this points to the API route
  icon: {
    src: "/sidebar-icons/log-out.svg",
    alt: "Logout Icon",
    width: 20,
    height: 20
  },
  isExternal: true // optional flag to indicate server redirect
}


const rootSidebarItems = isAdmin ? adminRootSidebarItems : empRootSidebarItems;

export default rootSidebarItems;