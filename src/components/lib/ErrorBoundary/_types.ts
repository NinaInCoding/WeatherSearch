import { type ReactNode } from 'react';

export interface Props {
	type?: EErrorTypes
	children?: ReactNode
}

export interface State {
	hasError: boolean
}

export enum EErrorTypes {
	FULL_PAGE = 'FULL_PAGE',
	MASSAGE = 'MASSAGE',
	HIDDEN = 'HIDDEN'
}
