import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from '@/pages/Register.tsx';
import BaseLayout from './components/layout/BaseLayout';
import RandomMenuBox from '@/pages/RandomMenuBox.tsx';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<RandomMenuBox />} />
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
