import Swal from 'sweetalert2';
import './css/spinnerNotFound.css';
import { ISawLoadingSpinner } from 'utils';
import { useEffect } from 'react';

export const NotFoundSpinner = ({ title, text }: ISawLoadingSpinner) => {
  useEffect(() => {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'error',
      iconColor: 'white',
      title: title,
      text: text,
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return () => {
      Swal.close();
    };
  }, []);
  return null;
};
