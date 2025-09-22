import { inter, geistMono, geistSans } from "./fonts";
import "./globals.css";
// import StoreProvider from "../components/Store/StoreProvider/StoreProvider";
// import { Toaster } from "@/components/Shared/UI/Shadcn/sonner";
// import { toastDurationShort } from "@/constants/literals/toast";

export const metadata = {
  title: "ELMS",
  description: "Employees Leave Management System",
};

export default function RootLayout({
  children,
} ) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
        {/* <StoreProvider> */}
          {children}
          {/* <Toaster duration={toastDurationShort} /> */}
        {/* </StoreProvider> */}
      </body>
    </html>
  );
}