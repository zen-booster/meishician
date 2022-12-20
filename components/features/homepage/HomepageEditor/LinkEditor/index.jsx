import { useSelector, useDispatch } from 'react-redux';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import NewLinkWrapper from './NewLinkWrapper';
import LinkDnDContainer from './LinkDnDContainer';
import LinkContainer from './LinkContainer';
import EditorMode from './EditorMode';
import DisplayMode from './DisplayMode';

import { setLinkEditorData } from '../../../../../store/actions/homepageActions';

import linkTypeIconMap from '../../../../../data/linkTypeIconMap';

function LinkEditor() {
  const { homepageData, linkEditor } = useSelector((state) => state.homepage);
  const { token } = useSelector((state) => state.loginStatus);
  const { cardId, homepageLink } = homepageData;
  const { isLinkEditorActive, isNewLink, activeLinkId } = linkEditor;
  const isNewLinkActive = isLinkEditorActive && isNewLink;
  const dispatch = useDispatch();

  function handleOpenLinkEditor(activeLinkId, activeType) {
    dispatch(
      setLinkEditorData({
        isLinkEditorActive: true,
        isNewLink: false,
        activeLinkId,
        activeType,
      })
    );
  }

  function handleCloseLinkEditor() {
    dispatch(
      setLinkEditorData({
        isLinkEditorActive: false,
        isNewLink: false,
        activeLinkId: null,
        activeType: null,
        uploadImgUrl: null,
      })
    );
  }

  function renderHomepageLink(cardId, token) {
    return homepageLink.map((linkData, index) => {
      const { type, title, subTitle, link, icon, _id: linkId } = linkData;
      const iconSrc = icon || linkTypeIconMap[type].src;
      const isEditorModeOn = isLinkEditorActive && activeLinkId === linkId;
      return (
        <LinkDnDContainer
          key={linkId}
          linkId={linkId}
          index={index}
          cardId={cardId}
          token={token}
        >
          <LinkContainer>
            {isEditorModeOn ? (
              <EditorMode
                idData={{ cardId, linkId, token }}
                linkData={{ title, subTitle, link, icon }}
                onCloseEditorClick={() => handleCloseLinkEditor()}
              />
            ) : (
              <DisplayMode
                {...{ type, title, subTitle, link, cardId, token, iconSrc }}
                onOpenEditorClick={() => handleOpenLinkEditor(linkId, type)}
              />
            )}
          </LinkContainer>
        </LinkDnDContainer>
      );
    });
  }

  return (
    <>
      {isNewLinkActive && (
        <NewLinkWrapper>
          <EditorMode isNewLink idData={{ cardId, token }} />
        </NewLinkWrapper>
      )}
      <DndProvider backend={HTML5Backend}>
        {renderHomepageLink(cardId, token)}
      </DndProvider>
    </>
  );
}

export default LinkEditor;
