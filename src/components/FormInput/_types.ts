export enum EFormInputLabelPosition {
	START = 'start',
	END = 'end'
}

export type TFormInput = {
	name: string
	type: string

	id?: string
	value?: string
	placeholder?: string
	minLength?: number
	maxLength?: number
	pattern?: any
	errorMessage?: string
	isValid?: boolean
	classes?: string
	errorClasses?: string
	autoFocus?: boolean
	label?: {
		text: string
		position: EFormInputLabelPosition
	}
	handleChange?: (props: any) => void
	handleFocus?: (props: any) => void
	handleBlur?: (props: any) => void
	handleValidityChange?: (isValid: boolean) => void
};
