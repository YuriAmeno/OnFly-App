import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './css/spinnerLoading.css';
import { ISawLoadingSpinner } from 'utils';

export const LoadingSpinner = ({ title }: ISawLoadingSpinner) => {
  useEffect(() => {
    Swal.fire({
      position: 'top',
      icon: 'info',
      iconColor: 'white',
      title: title,
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
