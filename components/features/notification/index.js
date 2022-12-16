import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Space from '../../common/Space/Space';
import Tag from './Tag';
import Card from './Card';
import notificationTypes from '../../../data/notificationTypes';
import { getAllMessages } from '../../../store/actions/messageActions';

function Notification() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messageStatus);
  const [category, setCategory] = useState('ALL');

  useEffect(() => {
    dispatch(getAllMessages());
  }, []);

  return (
    <div className="mx-auto max-w-container">
      <div className="flex min-h-screen flex-col items-center bg-gray-04 pt-20">
        <Space />
        <div className="w-full max-w-5xl">
          <h2 className="mb-7 self-start text-h4 font-bold text-main-01">
            訊息通知
          </h2>
          <div className="mb-8 flex w-full items-center justify-between">
            <div className="flex gap-14">
              {notificationTypes.map((data) => (
                <div
                  className="flex items-center gap-1.5 text-body"
                  key={data.id}
                >
                  <Tag type={data.type} />
                  <p>{data.content}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-gray-01 px-5 py-3 text-body">
              <span className="mr-8 text-gray-03">篩選</span>
              <select
                className="border border-b-2 border-main-01 bg-white py-1 px-4 text-body text-main-01"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue="All"
              >
                <option value="ALL">所有訊息</option>
                <option value="DELETE">名片刪除訊息</option>
                <option value="CHANGE">職務異動訊息</option>
              </select>
            </div>
          </div>

          <div className="mb-11 flex w-full flex-col gap-8">
            {category === 'ALL' &&
              messages.map((message) => (
                <Card key={message.messageId} message={message} />
              ))}
            {category === 'DELETE' &&
              messages
                .filter((item) => item.category === category)
                .map((message) => (
                  <Card key={message.messageId} message={message} />
                ))}
            {category === 'CHANGE' &&
              messages
                .filter((item) => item.category === category)
                .map((message) => (
                  <Card key={message.messageId} message={message} />
                ))}
          </div>
          <p className="mb-20 text-center text-h4 text-gray-02">
            -<br />
            沒有其他通知囉！
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
