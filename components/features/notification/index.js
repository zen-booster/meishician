import { useEffect } from 'react';
import axios from 'axios';
import Select from '../../common/Select/Select';
import Tag from './Tag';
import Card from './Card';
import notificationContent from '../../../data/notificationContent';
import notificationSelect from '../../../data/notificationSelect';
import notificationTypes from '../../../data/notificationTypes';
import { DOMAIN_URL } from '../../../configs';

function Notification() {
  useEffect(() => {
    axios
      .get(`${DOMAIN_URL}/api/messages`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto max-w-container">
      <div className="flex flex-col items-center bg-gray-04 pt-20">
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
            <Select>{notificationSelect}</Select>
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
