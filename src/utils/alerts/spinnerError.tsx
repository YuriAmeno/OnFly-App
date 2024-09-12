import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { ISawLoadingSpinner } from 'utils';

export const ErrorSpinner = ({ title, text }: ISawLoadingSpinner) => {
  useEffect(() => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return () => {
      Swal.close();
    };
  }, []);
  return null;
};
