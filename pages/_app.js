import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import Layout from '../components/common/Layout/Layout';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
