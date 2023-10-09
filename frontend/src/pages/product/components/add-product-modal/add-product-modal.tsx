import { FaPlus } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, FormProductInputModel, Modal, ModalProps, ValidationError, productFormValidation, productViewModel, ProductService } from "../../../../shared";
import { ProductForm } from "../../components";

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  setData: Dispatch<SetStateAction<productViewModel[]>>;
};

export const AddProductModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormProductInputModel>({
    mode: 'onChange',
    resolver: yupResolver(productFormValidation),
  });

  const submitButton = (
    <Button
      type="submit"
      disabled={!form.formState.isValid}
      form="add-product-form"
      variant="primary"
      isLoading={isLoading}
    >
      Salvar
    </Button>
  );

  const onSuccess = async (data: FormProductInputModel) => {
    const response = await ProductService.add({ data });

    Alert.callSuccess({
      title: 'Produto cadastrado',
      onConfirm: onRequestClose,
    });

    setIsLoading(false);

    form.reset();
    setData((prevData) => [...prevData, response]);
  }

  const onError = (error: unknown) => {
    setIsLoading(false);
    form.reset();

    if (error instanceof ValidationError) {
      Alert.callError({
        title: (error as Error).name,
        description: error.errors[0],
      });
    } else {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  };

  const onSubmit: SubmitHandler<FormProductInputModel> = async (data) => {
    setIsLoading(true);

    try {
      await onSuccess(data)
    } catch (error) {
      onError(error)
    }
  };

  const modalConfigs: ModalProps = {
    size: 'sm',
    isOpen,
    icon: FaPlus,
    onRequestClose,
    title: 'Cadastro de produto',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <ProductForm id="add-product-form" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};
