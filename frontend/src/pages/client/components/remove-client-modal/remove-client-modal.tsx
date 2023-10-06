import { FaTrash } from 'react-icons/fa';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert, ConfirmModal, ConfirmModalProps, ModalProps, clientViewModel } from '../../../../shared';
import { ClientService } from '../../../../shared/services';

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  name?: string;
  id?: string;
  setData: Dispatch<SetStateAction<clientViewModel[]>>;
};

export const RemoveClientModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  name,
  id,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    if (id) {
      setIsLoading(true)

      await ClientService.remove({ id });

      Alert.callSuccess({
        title: `Cliente removido com sucesso!`,
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((data) => data.filter((list) => list.id !== Number(id)));
    }
  }

  const onError = (error: unknown) => {
    Alert.callError({
      title: (error as Error).name,
      description: (error as Error).message,
    });
  };

  const onConfirm = async () => {
    try {
      await onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const modalConfigs: ConfirmModalProps = {
    isOpen,
    onRequestClose,
    onConfirm,
    title: 'Remoção do cliente',
    icon: FaTrash,
    size: 'sm',
    message: `Tem certeza de que deseja excluir o cliente ${name}?`,
    isLoading: isLoading,
  };

  return <ConfirmModal {...modalConfigs} />;
};
