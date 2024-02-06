import { Outlet } from 'react-router-dom';
import Header from '~/components/Header/Header';
import Sidebar from '~/components/Sidebar/Sidebar';

export default function DashboardLayout() {
  return (
    <>
      <div className="sticky top-0 z-40 h-[91px] w-full">
        <Header />
      </div>
      <div className="fixed left-0 mt-[-91px] h-screen w-[117px] flex-none overflow-y-auto">
        <Sidebar />
      </div>
      <main className="h-full w-full flex-auto py-16 pl-[calc(117px+96px)] pr-24">
        <Outlet />
      </main>
    </>
  );
}
