import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Control, useController} from 'react-hook-form';
import clsx from 'clsx';
import EyeSVG from '@/assets/svg/Eye';
import EyeLineSVG from '@/assets/svg/EyeLine';

interface Props {
  name: string;
  label?: string;
  defaultValue?: string | number | string[];
  type?: 'text' | 'search' | 'number' | 'password' | 'email' | 'tel';
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  autocomplete?: 'on' | 'off';
  control: Control<any>;
  maxLength?: number;
}

const TextInput: FC<Props> = ({
  name,
  label,
  type,
  placeholder,
  className = '',
  containerClassName = '',
  disabled,
  control,
  defaultValue,
  maxLength,
  autocomplete
}) => {
  const [showValue, setShowValue] = useState<boolean>(false);
  const {
    field,
    fieldState: {error}
  } = useController({name, control, defaultValue});

  const togglePassword = () => setShowValue((prevState: boolean) => !prevState);

  return (
    <div
      className={clsx(
        'mb-2 flex w-full w-fit flex-col items-start justify-center gap-2 outline-none',
        containerClassName
      )}>
      {label && (
        <label htmlFor={name} className="text-sm font-thin">
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <input
          {...field}
          type={showValue ? 'text' : type}
          id={name}
          className={clsx(
            'text-md ltr box-border w-full w-[50vw] min-w-[15rem] max-w-[20rem] rounded border border-pen-light bg-[#161a1e] p-4 text-left text-xs text-body outline-pen-light focus:outline focus:outline-1',
            {'pr-12': type === 'password'},
            {'cursor-not-allowed bg-gray-200': disabled},
            {'border border-red-400': error?.message},
            className
          )}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autocomplete}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute top-[1px] right-1 m-1 flex inline-flex h-10 w-10 items-center items-center justify-center rounded-full bg-primary"
            onClick={togglePassword}>
            {showValue ? <EyeSVG /> : <EyeLineSVG />}
          </button>
        )}
      </div>
      {error?.message && (
        <span className="mt-1 ml-1 flex items-center text-tiny font-thin tracking-wide text-red-500">
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default TextInput;
