import UserSearchProvider from '@/context/UserSearch.context';
import Chips from './Chips';
import Input from './Input';

const UserSearch = () => (
	<UserSearchProvider>
		<div className='flex flex-wrap gap-1 min-w-48 md:w-full max-w-[30rem] border-b border-b-sky-500'>
			<Chips />
			<Input />
		</div>
	</UserSearchProvider>
);

export default UserSearch;
