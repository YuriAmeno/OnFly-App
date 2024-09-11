import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './css/spinnerLoading.css';
import { ISawLoadingSpinner } from 'utils';

export const SuccessSpinner = ({ title, text }: ISawLoadingSpinner) => {
  useEffect(() => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      iconColor: 'white',
      title: title,
      text: text,
      backdrop: false,
      toast: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: 'custom-swal-bg custom-swal-top-center',
        title: 'custom-swal-title',
        loader: 'custom-swal-loading',
      },
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
