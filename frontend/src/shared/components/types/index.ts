import { Props as ReactSelectProps } from 'react-select'

import {
  ButtonHTMLAttributes,
  ComponentType,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  transparent?: boolean;
  variant?: 'primary' | 'danger' | 'info';
  disabled?: boolean;
  isLoading?: boolean;
}

export type CardProps = {
  stateTask: string;
  titleTask: string;
  description: string;
  dateTime: string;
};

export interface IconButtonProps {
  variant: 'edit' | 'remove';
  icon: ComponentType;
  onClick: () => void;
}

export interface PageHeaderProps {
  title: string;
  description: string;
  icon: ComponentType;
  action?: ReactNode;
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: string;
  isRequired?: boolean;
  error?: string;
}

export type ModalProps = {
  isOpen?: boolean;
  onRequestClose?: () => void;
  icon?: ComponentType;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode[];
  size?: 'sm' | 'lg';
};

export interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  message?: string;
  isLoading?: boolean;
}

export interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isRequired?: boolean;
  error?: string;
}

export type SelectOption = {
  value: any;
  label: string;
}

export type SelectProps = ReactSelectProps<SelectOption | any> & {
  placeholder: string;
}
