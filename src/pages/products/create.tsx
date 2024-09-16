import { useAlert } from 'Contexts';
import { getAllUsers } from 'cores';
import { getAllCategory } from 'cores/category';
import { TProductCreate } from 'cores/product/_models';
import { createProduct } from 'cores/product/_request';

import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateProductSchema, initial_values_product_create } from 'schemaFormik/products';
import { ErrorSpinner, LoadingSpinner, SuccessSpinner } from 'utils';
import { formatMask } from 'utils/masks/money';

export const CreateProductPage = () => {
  const {
    setIsLoading,
    setMsg,
    setIsLoadingError,
    isLoading,
    isLoadingError,
    msg,
    isLoadingSuccess,
    setIsLoadingSuccess,
  } = useAlert();

  const [categories, setCategories] = useState<any>();
  const [users, setUsers] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const dataCategory = await getAllCategory();
      setCategories(dataCategory);
      const dataUsers = await getAllUsers();
      setUsers(dataUsers);
    };
    init();
  }, []);

  const formik = useFormik({
    initialValues: initial_values_product_create,
    validationSchema: CreateProductSchema,
    onSubmit: async (val: TProductCreate) => {
      try {
        val.data = moment().format('YYYY-MM-DD');
        await createProduct(val);
        handleSucces('Produto criado com sucesso!!!!');
      } catch (error: any) {
        handleCatch(error.response.data.message);
      } finally {
        setTimeout(() => {
          handleFinally();
          navigate('/products');
        }, 2000);
      }
    },
  });

  const handleCatch = (msg: string | any) => {
    setIsLoading(false);
    setIsLoadingError(true);
    setMsg(msg);
  };

  const handleSucces = (msg: string | any) => {
    setIsLoading(false);
    setIsLoadingError(false);
    setIsLoadingSuccess(true);
    setMsg(msg);
  };

  const handleFinally = () => {
    setIsLoading(false);
    setIsLoadingError(false);
    setIsLoadingSuccess(false);
  };

  // const handleOnChangeValue = (event: any) => {
  //   formik.setFieldValue('value', formatMask(event.target.value));
  // };

  return (
    <>
      {isLoading && <LoadingSpinner title={'Validando informações...'} />}
      {isLoadingSuccess && <SuccessSpinner title={'Produto adcionado com sucesso!!!!'} />}
      {isLoadingError && <ErrorSpinner title={'Error'} text={msg} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">Criar Produto</h5>
          <div className="relative mb-4 mt-12">
            <input
              type="text"
              className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-black bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...formik.getFieldProps('description')}
            />
            <label
              htmlFor="productName"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-1/2 top-1/2 left-2 scale-100 origin-[0] bg-white px-2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:translate-y-[-50%] peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Nome do Produto
            </label>
          </div>
          {formik.touched?.description && formik.errors?.description && formik.errors?.description ? (
            <div className="block mb-1 font-semibold text-sm">
              <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">{formik.errors?.description}</h5>
            </div>
          ) : null}

          <div className="relative mb-4 mt-12">
            <input
              type="text"
              className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-black bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...formik.getFieldProps('value')}
              // onChange={handleOnChangeValue}
            />
            <label
              htmlFor="productName"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-1/2 top-1/2 left-2 scale-100 origin-[0] bg-white px-2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:translate-y-[-50%] peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Valor do Produto
            </label>
          </div>

          <div className="relative mb-4 mt-12">
            <select
              id="countries"
              className="bg-white-50 border border-white-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => {
                formik.setFieldValue('category_id', e.target.value);
              }}
            >
              <option value="">Selecione uma categoria</option>;
              {categories?.map((val: any) => {
                return <option value={val?.id}>{val?.name}</option>;
              })}
            </select>
          </div>

          {formik.touched?.category_id && formik.errors?.category_id && formik.errors?.category_id ? (
            <div className="block mb-1 font-semibold text-sm">
              <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">{formik.errors?.category_id}</h5>
            </div>
          ) : null}

          <div className="relative mt-12 mb-12">
            <select
              id="countries"
              className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5   
            "
              onChange={(e) => {
                formik.setFieldValue('user_id', e.target.value);
              }}
            >
              <option selected>Selecione um Usuário</option>
              {users?.map((val: any) => {
                return <option value={val?.id}>{val?.name}</option>;
              })}
            </select>
          </div>

          {formik.touched?.user_id && formik.errors?.user_id && formik.errors?.user_id ? (
            <div className="block mb-1 font-semibold text-sm">
              <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">{formik.errors?.user_id}</h5>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Criar Produto
          </button>
        </div>
      </form>
    </>
  );
};
