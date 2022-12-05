import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import Layout from '../components/common/Layout/Layout';
import AuthContext from '../components/common/AuthContext/AuthContext';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <AuthContext>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </AuthContext>
    </Provider>
  );
}

export default MyApp;
