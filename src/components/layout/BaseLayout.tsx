import { Outlet } from 'react-router-dom';
import Header from './Header';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
