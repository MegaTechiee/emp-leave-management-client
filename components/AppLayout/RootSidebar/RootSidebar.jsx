import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu
} from "@/components/Shared/UI/Shadcn/sidebar"

import rootSidebarItems, { logoutSidebarItem } from "@/constants/literals/sidebar";
import styles from './RootSidebar.module.css';
import SidebarNavItem from "./SubComponents/SidebarNavItem/SidebarNavItem";

const RootSidebar = () => {
  
  return (
    <Sidebar 
      className={styles.rootSidebarContainer}
      variant="sidebar" 
      collapsible="none"
      data-testid="root-sidebar"
    >
      <SidebarContent data-testid="sidebar-content">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu data-testid="sidebar-menu">
              {rootSidebarItems.map((item) => (
                <SidebarNavItem 
                  key={item.title}
                  {...item}
                  data-testid="sidebar-nav-item"
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu data-testid="sidebar-menu">
          <SidebarNavItem 
              key={logoutSidebarItem.title}
              {...logoutSidebarItem}
              data-testid="sidebar-nav-item"
            />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default RootSidebar;