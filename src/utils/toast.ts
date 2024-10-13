import { Notifier, NotifierComponents } from "react-native-notifier";

type ToastProps = {
  title: string;
  message: string;
};

class ToastManager {
  success(props: ToastProps) {
    Notifier.showNotification({
      title: props?.title,
      description: props?.message,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: "success",
      },
    });
  }
  error(props: ToastProps) {
    Notifier.showNotification({
      title: props?.title,
      description: props?.message,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: "error",
      },
    });
  }
}

const Toast = new ToastManager();
export default Toast;
