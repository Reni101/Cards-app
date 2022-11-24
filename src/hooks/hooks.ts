import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppRootStateType} from "../Redux/Store";
import {useEffect, useState} from 'react'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => <AppDispatch>useDispatch()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//=================== useDebounce =============================
function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce

// const [value, setValue] = useState<string>('')
//   const debouncedValue = useDebounce<string>(value, 500)
//
//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value)
//   }
//
//   // Fetch API (optional)
//   useEffect(() => {
//     // Do fetch here...
//     // Triggers when "debouncedValue" changes
//   }, [debouncedValue])