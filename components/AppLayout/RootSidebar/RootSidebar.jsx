import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu
} from "@/components/Shared/UI/Shadcn/sidebar"

import rootSidebarItems from "@/constants/literals/sidebar";
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
    </Sidebar>
  )
}

export default RootSidebar;