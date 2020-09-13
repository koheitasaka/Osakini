import { AppProps } from 'next/app';
import AuthHoc from '../components/HOC/AuthHoc';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthHoc>
      <Component {...pageProps} />
    </AuthHoc>
  );
};

export default App;
