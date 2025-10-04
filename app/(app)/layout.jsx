import { SidebarProvider } from "@/components/Shared/UI/Shadcn/sidebar";
import RootSidebar from "@/components/AppLayout/RootSidebar/RootSidebar";
import "./app-layout.css"
import RootHeader from "@/components/AppLayout/RootHeader/RootHeader";
import RootFooter from "@/components/AppLayout/RootFooter/RootFooter";
// import ToastFlagListener from "@/components/Shared/UI/ToastFlagListener/ToastFlagListener";
// import { LOGIN_SUCCESS_COOKIE_NAME } from "@/constants/cookies/cookies";
// import { userSignedInMessage } from "@/constants/literals/messages";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout" data-testid="app-layout">
      <header className="app-layout-header" data-testid="app-layout-header">
        <RootHeader />
      </header>

      <SidebarProvider 
        className="app-layout-sidebar-provider"
        style={{
            "--sidebar-width": "15rem",
          }}
        data-testid="app-layout-sidebar-provider"
      >
        <aside className="app-layout-sidebar" data-testid="app-layout-sidebar">
          <RootSidebar />
        </aside>

        <main className="app-layout-main" data-testid="app-layout-main">
          {children}
          {/* <ToastFlagListener cookieName={LOGIN_SUCCESS_COOKIE_NAME} message={userSignedInMessage} /> */}
        </main>
      </SidebarProvider>

      <footer className="app-layout-footer" data-testid="app-layout-footer">
        <RootFooter />
      </footer>
    </div>
  );
}
