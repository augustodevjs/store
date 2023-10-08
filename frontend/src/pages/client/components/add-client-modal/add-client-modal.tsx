import { FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ClientForm } from '../../components';
import { Alert, Button, Modal, ModalProps, FormClientInputModel, clientFormValidaon, clientViewModel, ValidationError, ClientService } from '../../../../shared';

import * as S from './add-client-modal.styles'

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  setData: Dispatch<SetStateAction<clientViewModel[]>>;
};

export const AddClientModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormClientInputModel>({
    mode: 'onChange',
    resolver: yupResolver(clientFormValidaon),
  });

  const submitButton = (
    <Button
      type="submit"
      disabled={!form.formState.isValid}
      form="add-client-form"
      variant="primary"
    >
      {isLoading ? (
        <S.ContainerLoading>
          <ClipLoader color="#fff" loading size={18} speedMultiplier={1} />
        </S.ContainerLoading>
      ) : (
        'Salvar'
      )}
    </Button>
  );

  const onSuccess = async (data: FormClientInputModel) => {
    const response = await ClientService.add({ data });

    Alert.callSuccess({
      title: 'Cliente cadastrado',
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

  const onSubmit: SubmitHandler<FormClientInputModel> = async (data) => {
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
    title: 'Cadastro de cliente',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <ClientForm id="add-client-form" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};
