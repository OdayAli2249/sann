import { FormikConfig, FormikValues, useFormik } from "formik";
import { useState } from "react";

type UseFormArgs<T> = FormikConfig<T> & {
  initialValidateOnChange?: boolean;
};
const useForm = <T extends FormikValues = any>({
  initialValidateOnChange = false,
  ...config
}: UseFormArgs<T>) => {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState<boolean>(false);

  const options = {
    ...useFormik<T>({
      ...config,
      validateOnChange: initialValidateOnChange ?? validateAfterSubmit,
    }),
    handleSubmit: async (e?: React.FormEvent<HTMLFormElement>) => {
      setValidateAfterSubmit(true);
      e?.preventDefault();
      e?.stopPropagation();
      await options.submitForm();
    },
  };

  return options;
};

export default useForm;
