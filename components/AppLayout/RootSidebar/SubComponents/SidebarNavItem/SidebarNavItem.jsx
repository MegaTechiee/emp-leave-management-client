'use client';

import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation';
import Image from "next/image";

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/Shared/UI/Shadcn/sidebar"


const SidebarNavItem = (item) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton 
        asChild 
        isActive={pathname === item.url || pathname.startsWith(item.url + "/")}
        data-testid="sidebar-menu-button"
      >
        <Link href={item.url} data-testid="sidebar-link">
          <Image 
            src={item.icon.src} 
            alt={item.icon.alt}
            width={item.icon.width}
            height={item.icon.height}
            data-testid="sidebar-icon"
          />
          <span className="text-base" data-testid="sidebar-title">
            {item.title}
            </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default SidebarNavItem
