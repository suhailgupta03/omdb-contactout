import { notification } from 'antd';

const openNotificationWithIcon = (type, description) => {
    notification[type]({
      description,
      duration: 60
    });
  };

export default openNotificationWithIcon;


