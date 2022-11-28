import '../styles/globals.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import Navbar from '../components/common/Navbar/Navbar';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Navbar>
        <Component {...props.pageProps} />
      </Navbar>
    </Provider>
  );
}

export default MyApp;
