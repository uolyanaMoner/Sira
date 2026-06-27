import TopBar from "../components/TopBar";
import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar />
      <main>{children}</main>
    </div>
  );
}