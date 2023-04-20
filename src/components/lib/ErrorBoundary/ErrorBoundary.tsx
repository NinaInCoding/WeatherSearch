import { Component, type ErrorInfo } from 'react';
import { type Props, type State, EErrorTypes } from './_types';

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			switch (true) {
			case this.props?.type === EErrorTypes.FULL_PAGE:
				return (
					<div className='fixed
									w-full
									h-full
									flex
									flex-col
									justify-center
									items-center
									z-50'>
						<h1>Oops! Something went wrong...</h1>
					</div>
				);
			case this.props?.type === EErrorTypes.HIDDEN:
				return null;
			default:
				return <h1 className='z-50'>Oops! Something went wrong...</h1>;
			}
		}

		return this.props.children;
	}
}
