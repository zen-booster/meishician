import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import ItemTypes from './ItemTypes';
import {
  setLinkOrder,
  updateLinkOrderApi,
} from '../../../store/actions/homepageActions';

function LinkDnDContainer({ linkId, index, children, cardId, token }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const { isLinkEditorActive } = useSelector(
    (state) => state.homepage.linkEditor
  );

  const [, listItemDrop] = useDrop({
    accept: ItemTypes.LINK_ITEM,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(setLinkOrder(dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
    drop(item) {
      dispatch(updateLinkOrderApi(cardId, token, linkId, item.index));
    },
  });

  const [{ isListItemDragging }, listItemDrag] = useDrag({
    type: ItemTypes.LINK_ITEM,
    item: { id: linkId, index },
    canDrag: () => !isLinkEditorActive,
    collect: (monitor) => ({
      isListItemDragging: !!monitor.isDragging(),
      canDrop: !!monitor.canDrag(),
    }),
  });

  const opacity = isListItemDragging ? 0.3 : 1;
  listItemDrag(listItemDrop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
}

export default LinkDnDContainer;
