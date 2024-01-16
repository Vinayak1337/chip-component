'use client';
import {
	removeChip,
	selectChip,
	setInput,
	useDispatch,
	useInput,
	useSelectedChip
} from '@/context/UserSearch.context';
import React, { useEffect, useRef } from 'react';
import InputSuggestion from './InputSuggestion';

const Input = () => {
	const [isFocused, setIsFocus] = React.useState(false);

	const input = useInput();
	const selectedChip = useSelectedChip();
	const dispatch = useDispatch();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch(setInput(e.target.value));

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (input || e.key !== 'Backspace') return;

		if (!selectedChip) return dispatch(selectChip(true));

		dispatch(removeChip(selectedChip));
	};

	const handleFocus = () => setIsFocus(true);

	useEffect(() => {
		const handleBlur = (e: MouseEvent) => {
			if (!wrapperRef.current?.contains(e.target as Node)) {
				setIsFocus(false);
				dispatch(selectChip(false));
			}
		};

		window.addEventListener('click', handleBlur);

		return () => window.removeEventListener('click', handleBlur);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={wrapperRef}
			id='chip-input'
			onFocus={handleFocus}
			className='w-full relative h-10 self-end flex flex-col'>
			<input
				type='text'
				className='min-w-28 w-full h-10 p-2 outline-none caret-sky-500 bg-transparent'
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				value={input}
			/>
			<div onClick={handleFocus} className='absolute z-20 top-11 right-0'>
				{isFocused && <InputSuggestion />}
			</div>
		</div>
	);
};

export default Input;
