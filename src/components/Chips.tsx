'use client';
import {
	removeChip,
	useChips,
	useDispatch,
	useSelectedChip
} from '@/context/UserSearch.context';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

const Chips = () => {
	const chips = useChips();
	const selectedChip = useSelectedChip();

	return (
		<div className='flex gap-2 flex-wrap w-fit'>
			{chips.map(chip => (
				<Chip
					isSelected={chip.id === selectedChip}
					key={chip.id + '-chip'}
					{...chip}
				/>
			))}
		</div>
	);
};

export default Chips;

const Chip: FC<User & { isSelected: boolean }> = ({
	avatar,
	name,
	id,
	isSelected
}) => {
	const dispatch = useDispatch();

	const deleteChip = () => dispatch(removeChip(id));

	return (
		<div
			className={clsx(
				'flex max-w-44 gap-1 flex-grow w-max items-center justify-between rounded-[32px] bg-zinc-300 pr-2',
				{
					'border border-sky-500': isSelected
				}
			)}>
			<div className='flex gap-1 items-center'>
				<Image
					className='rounded-full bg-gray-400'
					src={avatar}
					alt={name}
					width={32}
					height={32}
				/>
				<p className='text-sm font-medium w-min truncate'>{name}</p>
			</div>
			<span onClick={deleteChip} className='cross cursor-pointer' />
		</div>
	);
};
