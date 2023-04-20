import { type FC, useState, useRef, useEffect } from 'react';
import { type TFormInput, EFormInputLabelPosition } from './_types';
import classNames from 'classnames';
import { ErrorMessage } from '../ErrorMessage';
import './FormInput.css';

export const FormInput: FC<TFormInput> = ({
	classes, errorClasses, label, errorMessage, pattern, handleChange, handleFocus, handleBlur, handleValidityChange, ...inputProps
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isValid, setIsValid] = useState<boolean>(true);
	const [focused, setFocused] = useState(false);

	if (handleValidityChange) {
		useEffect(() => {
			handleValidityChange(isValid);
		}, [isValid]);
	}

	const innerHandleChange = (event: React.FormEvent) => {
		if (pattern) {
			const inputValue = (event?.target as HTMLInputElement)?.value;
			const match = inputValue.match(pattern);
			if (inputRef?.current) setIsValid(!!match?.length);
		}
		if (handleChange) handleChange(event);
	};

	const innerHandleBlur = (event: React.FormEvent) => {
		setFocused(true);
		if (handleBlur) handleBlur(event);
	};

	const InputLayout = (
		<input
			ref={inputRef}
			onChange={innerHandleChange}
			onBlur={innerHandleBlur}
			onFocus={handleFocus}
			className={classNames('input', classes, {
				focused
			})}
			{...inputProps}
		/>
	);

	const InputLabelText = <span className='input__label-text'>{label?.text}</span>;


	return (
		<>
			{
				label?.position && label?.text
					? (
						<label>
							{ label.position === EFormInputLabelPosition.START && InputLabelText}
							{InputLayout}
							{ label.position === EFormInputLabelPosition.END && InputLabelText}
						</label>
					)
					: InputLayout
			}
			{
				errorMessage && (
					<ErrorMessage text={errorMessage}
						classes={classNames('input__error', errorClasses, {
							hidden: isValid
						})}/>)
			}
		</>
	);
};
