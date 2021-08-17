import { notification } from 'antd';

const Notification = (type, message, description = undefined) => {
  notification[type]({
    message,
    description,
  });
};

export default Notification;
