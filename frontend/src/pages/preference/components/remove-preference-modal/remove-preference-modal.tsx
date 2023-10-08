import { FaTrash } from 'react-icons/fa';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert, ConfirmModal, ConfirmModalProps, ModalProps, PreferencesService, preferenceClientViewModel } from '../../../../shared';

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  id?: string;
  client?: string;
  setData: Dispatch<SetStateAction<preferenceClientViewModel[]>>;
};

export const RemovePreferenceModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  id,
  client,
  setData
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    if (id) {
      await PreferencesService.remove({ id });

      Alert.callSuccess({
        title: `Preferência removida com sucesso!`,
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((data) => data.filter((list) => list.id !== Number(id)));
    }
  }

  const onError = (error: unknown) => {
    setIsLoading(false);

    Alert.callError({
      title: (error as Error).name,
      description: (error as Error).message,
    });
  };

  const onConfirm = async () => {
    setIsLoading(true);

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
    title: 'Remoção da preferência',
    icon: FaTrash,
    size: 'sm',
    message: `Tem certeza de que deseja excluir essa preferência do cliente ${client}?`,
    isLoading: isLoading,
  };

  return <ConfirmModal {...modalConfigs} />;
};
