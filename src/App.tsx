import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
const App = () => {
  return (
    <>
      <Toaster />

      <Outlet />
    </>
  );
};

export default App;
