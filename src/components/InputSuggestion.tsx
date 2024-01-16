'use client';
import {
	addChip,
	useDispatch,
	useInput,
	useUsers
} from '@/context/UserSearch.context';
import Image from 'next/image';
import { FC, useLayoutEffect, useRef } from 'react';

const InputSuggestion = () => {
	const users = useUsers();
	const input = useInput();

	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!ref.current) return;

		ref.current.style.height =
			users.length > 5 ? `${56 * 5}px` : `${users.length * 56}px`;
	}, [users]);

	return (
		<div
			ref={ref}
			className='flex snap-scroll-container overflow-x-hidden overflow-y-scroll max-h-48 h-0 w-fit flex-col rounded shadow transition-all duration-500 ease-in bg-gray-100'>
			{users.map(user => (
				<Suggestion
					key={user.id + '-input-suggestions'}
					{...user}
					input={input}
				/>
			))}
		</div>
	);
};

export default InputSuggestion;

const Suggestion: FC<User & { input: string }> = ({
	email,
	name,
	avatar,
	input,
	id
}) => {
	const dispatch = useDispatch();

	const addTOChip = () => dispatch(addChip(id));

	return (
		<div
			onClick={addTOChip}
			className='p-2 flex gap-2 items-center cursor-pointer rounded hover:bg-slate-300 justify-between w-fit'>
			<div className='flex gap-2 items-center'>
				<Image
					className='rounded-full bg-gray-400'
					src={avatar}
					alt={name}
					width={40}
					height={40}
				/>
				<p
					className='text-base font-medium w-full min-w-44 truncate'
					dangerouslySetInnerHTML={{
						__html: input ? getNameSplit(name, input) : name
					}}
				/>
			</div>
			<p className='min-w-44 hidden sm:block truncate text-right lowercase text-base font-medium text-gray-400'>
				{email}
			</p>
		</div>
	);
};

const getNameSplit = (name: string, input: string) =>
	name.replace(
		RegExp(input.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'),
		val =>
			`<span class='text-gray-400 font-medium text-sm tracking-widest'>${val}</span>`
	);
