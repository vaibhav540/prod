import { message } from "antd";

const Snackbar = (type, content, duration = 3) => {
  message.open({
    type,  
    content,
    duration,
  });
};

export default Snackbar;
