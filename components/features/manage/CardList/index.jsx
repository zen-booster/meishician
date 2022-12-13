import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { manageActiveSectionType } from '../../../../store/reducers/manageReducer';
import { setInitData } from '../../../../store/actions/manageActions';

export default function CardList() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { activeGroupId, mainSectionData, type, sortBy } = useSelector(
    (state) => state.manage.activeSection
  );

  const {
    type: activeType,
    activeGroupName,
    activeTag,
    activeQuery,
  } = useSelector((state) => state.manage.activeSection);

  function handleSortBy(e) {
    const sortBy = e.target.value;
    dispatch(setInitData(token, activeGroupId, 1, sortBy));
  }

  function renderMainSectionHeader() {
    switch (activeType) {
      case manageActiveSectionType.BOOKMARK: {
        return activeGroupName;
      }
      case manageActiveSectionType.PORTFOLIO: {
        return '我的名片';
      }
      case manageActiveSectionType.SEARCH: {
        return `${activeQuery}的搜尋結果`;
      }
      case manageActiveSectionType.TAG_FILTER: {
        return `#${activeTag} 篩選結果`;
      }

      default: {
        return '';
      }
    }
  }

  function renderCard() {
    return (
      <section className=" basis-full bg-gray-200 p-10 laptop:basis-3/5 xl:basis-3/4">
        <h3 className="text-3xl font-bold text-main-01">
          {renderMainSectionHeader()}
        </h3>
        {activeType === manageActiveSectionType.BOOKMARK && (
          <div className="flex justify-end">
            <label
              htmlFor="sortBy"
              className="inline-flex items-center rounded-xl bg-gray-300 p-4"
            >
              <p className="mr-6">排序</p>
              <select
                id="sortBy"
                onChange={handleSortBy}
                value={sortBy}
                className="w-24 p-1 pl-2 font-bold text-main-01"
              >
                <option value="-isPinned">置頂</option>
                <option value="-createdAt">最新</option>
              </select>
            </label>
          </div>
        )}

        <ul className="-mx-3 mt-8 flex flex-wrap">
          {mainSectionData.map((ele) => (
            <Card key={ele.cardId} cardData={ele} />
          ))}
        </ul>
      </section>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{mainSectionData.length > 0 ? renderCard() : <div>{type}</div>}</>;
}
