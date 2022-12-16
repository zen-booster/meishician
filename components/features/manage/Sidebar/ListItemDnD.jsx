import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from '../ItemTypes';

import {
  setGroupOrder,
  updateGroupOrderApi,
  setBookmarkGroup,
} from '../../../../store/actions/manageActions';

function ListItemDnD({ id, children, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const [, listItemDrop] = useDrop({
    accept: ItemTypes.LIST_ITEM,
    item: { id, groupId: id },
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
      dispatch(setGroupOrder(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
    drop(item) {
      dispatch(updateGroupOrderApi(token, id, item.index));
    },
  });

  const [{ isCardHover }, cardDrop] = useDrop({
    accept: ItemTypes.CARD,
    item: { id, groupId: id },
    drop: async (item, monitor) => {
      if (monitor.didDrop) {
        const groupId = id;
        const { cardId } = monitor.getItem();
        dispatch(setBookmarkGroup(token, groupId, cardId));
      }
    },
    collect: (monitor) => ({
      isCardHover: !!monitor.isOver(),
    }),
  });

  const [{ isListItemDragging }, listItemDrag] = useDrag({
    type: ItemTypes.LIST_ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isListItemDragging: monitor.isDragging(),
    }),
  });

  const opacity = isListItemDragging ? 0.3 : 1;
  listItemDrag(listItemDrop(cardDrop(ref)));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`mb-2 rounded-3xl border bg-slate-100 p-2 ${
        isCardHover && 'bg-[#A8D8B9]'
      }`}
    >
      {children}
    </div>
  );
}

export default ListItemDnD;
