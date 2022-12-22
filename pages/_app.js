import '../styles/globals.css';

import '../styles/font.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { wrapper } from '../store/store';
import Layout from '../components/common/Layout/Layout';
import AuthContext from '../components/common/AuthContext/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { host } = rest.prop;
  return (
    <Provider store={store}>
      <AuthContext>
        <Layout host={host}>
          <ToastContainer />
          <Component {...props.pageProps} />
        </Layout>
      </AuthContext>
    </Provider>
  );
}
MyApp.getInitialProps = async (context) => {
  const { ctx } = context;
  const { host } = ctx.req.headers;

  return { prop: { host } };
};
export default MyApp;
