import { useTypedSelector } from '../redux-hooks/useTypedSelector'

export const useAuth = () => useTypedSelector(state => state.user)
