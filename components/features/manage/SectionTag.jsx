import { useDispatch, useSelector } from 'react-redux';
import { getTagBookmarks } from '../../../store/actions/manageActions';

export default function SectionTag({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);

  function handleGetTagBookmarks(e) {
    e.preventDefault();
    dispatch(getTagBookmarks(token, children));
  }

  return (
    <li className="inline-block rounded bg-[#efc7d0] py-1 px-2  text-sm text-gray-700 drop-shadow-md hover:bg-main-02 hover:text-main-01">
      <button
        type="button"
        onClick={(e) => {
          handleGetTagBookmarks(e);
        }}
      >{`#${children}`}</button>
    </li>
  );
}
