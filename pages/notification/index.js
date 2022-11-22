import Select from '../../components/common/Select/Select';
import Tag from '../../components/features/notification/Tag';
import Card from '../../components/features/notification/Card';
import notificationContent from '../../data/notificationContent';
import notificationSelect from '../../data/notificationSelect';
import notificationTypes from '../../data/notificationTypes';
import Navbar from '../../components/common/Navbar/Navbar';

function Notification() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <h2 className="my-12 self-start text-3xl font-bold">訊息通知</h2>
        <div className="mb-8">
          <Select>{notificationSelect}</Select>
        </div>

        <div className="mb-4 self-start sm:flex sm:gap-2">
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
