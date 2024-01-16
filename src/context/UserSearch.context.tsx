'use client';
import users from '@/lib/users';
import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useReducer
} from 'react';

const initialState: State = {
	chips: [],
	input: '',
	users,
	_users: users,
	selectedChip: null
};

const UserSearchContext = createContext<UserSearchContextState>({
	...initialState,
	dispatch: () => {}
});

const UserSearchProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<UserSearchContext.Provider
			value={{
				...state,
				dispatch
			}}>
			{children}
		</UserSearchContext.Provider>
	);
};

export default UserSearchProvider;

interface State {
	chips: User[];
	input: string;
	users: User[];
	_users: User[];
	selectedChip: string | null;
}

type Action =
	| ReturnType<typeof addChip>
	| ReturnType<typeof removeChip>
	| ReturnType<typeof setInput>
	| ReturnType<typeof selectChip>;

interface UserSearchContextState extends State {
	dispatch: (action: Action) => void;
}

enum ActionType {
	ADD_CHIP = 'ADD_CHIP',
	REMOVE_CHIP = 'REMOVE_CHIP',
	SET_INPUT = 'SET_INPUT',
	SELECT_CHIP = 'SELECT_CHIP',
	DESELECT_CHIP = 'DESELECT_CHIP'
}

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case ActionType.ADD_CHIP: {
			const user = state.users.find(user => user.id === action.payload);

			if (!user) return state;

			const chips = [...state.chips, user];

			const users = [
				...state._users.filter(user => user.id !== action.payload)
			];

			return {
				...state,
				chips,
				input: '',
				_users: users,
				users
			};
		}

		case ActionType.REMOVE_CHIP: {
			const user = state.chips.find(user => user.id === action.payload);

			if (!user) return state;

			const chips = [...state.chips.filter(user => user.id !== action.payload)];

			const users = [...state._users, user];

			return {
				...state,
				chips,
				input: '',
				_users: users,
				users,
				selectedChip: null
			};
		}

		case ActionType.SET_INPUT: {
			const users = [
				...state._users.filter(user =>
					user.name.toLowerCase().includes(action.payload.toLowerCase())
				)
			];

			return {
				...state,
				input: action.payload,
				users
			};
		}

		case ActionType.SELECT_CHIP: {
			if (action.payload === state.selectedChip) return state;

			if (action.payload && state.selectedChip) return state;

			if (!action.payload) return { ...state, selectedChip: null };

			return {
				...state,
				selectedChip: state.chips.at(-1)?.id || null
			};
		}

		default:
			return state;
	}
};

export const addChip = (id: string) =>
	({
		type: ActionType.ADD_CHIP,
		payload: id
	} as const);

export const removeChip = (id: string) =>
	({
		type: ActionType.REMOVE_CHIP,
		payload: id
	} as const);

export const setInput = (input: string) =>
	({
		type: ActionType.SET_INPUT,
		payload: input
	} as const);

export const selectChip = (toSelectLast: boolean) =>
	({
		type: ActionType.SELECT_CHIP,
		payload: toSelectLast || null
	} as const);

export function useChips() {
	const context = useContext(UserSearchContext);

	if (!context) {
		throw new Error('useChips must be used within a UserSearchProvider');
	}

	return context.chips;
}

export function useInput() {
	const context = useContext(UserSearchContext);

	if (!context) {
		throw new Error('useInput must be used within a UserSearchProvider');
	}

	return context.input;
}

export function useUsers() {
	const context = useContext(UserSearchContext);

	if (!context) {
		throw new Error('useUsers must be used within a UserSearchProvider');
	}

	return context.users;
}

export function useDispatch() {
	const context = useContext(UserSearchContext);

	if (!context) {
		throw new Error('useDispatch must be used within a UserSearchProvider');
	}

	return context.dispatch;
}

export function useSelectedChip() {
	const context = useContext(UserSearchContext);

	if (!context) {
		throw new Error('useSelectedChip must be used within a UserSearchProvider');
	}

	return context.selectedChip;
}
