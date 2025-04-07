import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './scss/main.scss';
import AuthModal from './components/ui/authModal';
import Audio_component from './components/audio/audio';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'regenerator-runtime/runtime';

const queryClient = new QueryClient();
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthModal />
        <AppRoutes />
        <Audio_component />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
