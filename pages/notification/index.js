import Select from '../../components/common/Select/Select';
import Tag from '../../components/features/notification/Tag';
import Card from '../../components/features/notification/Card';
import notificationContent from '../../data/notificationContent';
import notificationSelect from '../../data/notificationSelect';
import notificationTypes from '../../data/notificationTypes';

function Notification() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl my-12 self-start font-bold">訊息通知</h2>
        <div className="mb-8">
          <Select>{notificationSelect}</Select>
        </div>

        <div className="sm:flex sm:gap-2 mb-4 self-start">
          {notificationTypes.map((data) => (
            <div className="flex items-center gap-1" key={data.id}>
              <Tag type={data.type} />
              <p>{data.content}</p>
            </div>
          ))}
        </div>

        {notificationContent.map((notification) => (
          <Card key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default Notification;
