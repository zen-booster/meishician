import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verify } from '../../../store/actions';

function AuthContext({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verify());
  }, []);

  return children;
}

export default AuthContext;
