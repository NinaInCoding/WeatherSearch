import { type FC } from 'react';
import { type TErrorMessage } from './_types';
import classNames from 'classnames';

export const ErrorMessage: FC<TErrorMessage> = ({ text, classes }) => (
	<p className={classNames('input__error', 'mt-2 text-rose-500', classes)}>
		{text}
	</p>
);
