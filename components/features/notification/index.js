import { useEffect } from 'react';
import axios from 'axios';
import Tag from './Tag';
import Card from './Card';
import notificationContent from '../../../data/notificationContent';
import notificationTypes from '../../../data/notificationTypes';
import { DOMAIN_URL } from '../../../configs';

function Notification() {
  useEffect(() => {
    const token = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = token;
    axios
      .get(`${DOMAIN_URL}/api/messages`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectRange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="mx-auto max-w-container">
      <div className="-mt-16 flex min-h-screen flex-col items-center bg-gray-04 pt-36">
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
                onChange={selectRange}
                defaultValue="All"
              >
                <option value="ALL">所有訊息</option>
                <option value="DELETE">名片刪除訊息</option>
                <option value="CHANGE">職務異動訊息</option>
              </select>
            </div>
          </div>

          <div className="mb-11 flex w-full flex-col gap-6">
            {notificationContent.map((notification) => (
              <Card key={notification.id} notification={notification} />
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
