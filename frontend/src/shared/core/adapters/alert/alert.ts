import Swal from 'sweetalert2';
import { CallAlert, CallErrorAlert, CallSuccessAlert } from '../../types';

export const call: CallAlert = ({ title, type, description, onConfirm }) => {
  void Swal.fire({
    icon: type,
    title,
    text: description,
    allowOutsideClick: false,
    returnFocus: false,
    customClass: {
      popup: 'popup-sweet-alert-background',
      title: 'title-sweet-alert',
      confirmButton: 'confirm-button-sweet-alert',
      htmlContainer: 'html-sweet-alert',
    },
  }).then((isConfirm) => {
    if (isConfirm) {
      if (onConfirm) {
        onConfirm();
      }
    }
  });
};

export const callSuccess: CallSuccessAlert = (input) => {
  return call({ type: 'success', ...input });
};

export const callError: CallErrorAlert = (input) => {
  return call({ type: 'error', ...input });
};
