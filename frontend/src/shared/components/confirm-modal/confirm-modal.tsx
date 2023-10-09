import { Button } from '..';
import { IoMdClose } from 'react-icons/io';
import { ConfirmModalProps } from '../types';

import * as S from './confirm-modal.styles';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onRequestClose,
  icon: Icon,
  message,
  title,
  size,
  onConfirm,
  isLoading
}) => {
  return (
    <S.Modal
      size={size ?? ''}
      isOpen={isOpen ?? false}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <S.Header>
        <S.Title>
          {Icon && <Icon />}
          {title}
        </S.Title>
        <IoMdClose onClick={onRequestClose} />
      </S.Header>

      <p>{message}</p>

      <S.ButtonGroup>
        <Button variant="danger" onClick={onRequestClose}>
          Fechar
        </Button>
        <Button isLoading={isLoading} onClick={onConfirm}>
          Confirmar
        </Button>
      </S.ButtonGroup>
    </S.Modal>
  );
};