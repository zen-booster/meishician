import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { manageActiveSectionType } from '../../../../store/reducers/manageReducer';
import { setInitData } from '../../../../store/actions/manageActions';
import PlaceholderPage from '../PlaceholderPage';

export default function CardList() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { mainSectionData } = useSelector(
    (state) => state.manage.activeSection
  );

  const {
    type: activeType,
    activeGroupName,
    activeTag,
    activeQuery,
  } = useSelector((state) => state.manage.activeSection);

  function renderCard() {
    return (
      <ul className="-mx-3 mt-8 flex flex-wrap">
        {mainSectionData.map((ele) => (
          <Card key={ele.cardId} cardData={ele} />
        ))}
      </ul>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <>
      <h3 className="text-3xl font-bold text-main-01">我的名片</h3>
      {mainSectionData.length > 0 ? renderCard() : <PlaceholderPage />}
    </>
  );
}
