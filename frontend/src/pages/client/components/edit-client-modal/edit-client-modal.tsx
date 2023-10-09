import { FaPen } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

import { ClientForm } from "..";
import { Alert, Button, FormClientInputModel, Modal, ModalProps, ValidationError, clientFormValidaon, clientViewModel, ClientService } from "../../../../shared";

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  id?: string;
  setData: Dispatch<SetStateAction<clientViewModel[]>>;
};

export const EditClientModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
  id,
}) => {
  const form = useForm<FormClientInputModel>({
    mode: 'onChange',
    resolver: yupResolver(clientFormValidaon),
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      if (id) {
        const response = await ClientService.loadById({ id: Number(id) });
        form.reset(response)
      }
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }, [form, id])

  useEffect(() => {
    loadData()
  }, [id, loadData]);

  const onSuccess = async (data: FormClientInputModel) => {
    if (id) {
      const response = await ClientService.update({ data, id: Number(id) });

      Alert.callSuccess({
        title: 'Cliente atualizado com sucesso!',
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((prevData) =>
        prevData.map((client) =>
          client.id === response.id ? { ...response } : client,
        ),
      );

      form.reset();
    }
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

  const onSubmit = async (data: FormClientInputModel) => {
    setIsLoading(true);
    try {
      await onSuccess(data)
    } catch (error) {
      onError(error)
    }
  };

  const submitButton = (
    <Button
      type="submit"
      disabled={!form.formState.isValid}
      form="edit-client-form"
      variant="primary"
      isLoading={isLoading}
    >
      Salvar
    </Button>
  );

  const modalConfigs: ModalProps = {
    size: 'sm',
    isOpen,
    icon: FaPen,
    onRequestClose,
    title: 'Edição de cliente',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <ClientForm id="edit-client-form" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};
