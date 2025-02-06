import { useCallback, useRef } from 'react'
import PropTypes from 'prop-types';

export function useDebounce(callback, delay) {
    useDebounce.propTypes = {
        callback: PropTypes.func.isRequired,
        delay: PropTypes.number.isRequired
    }

    const timeout = useRef(null)

    return useCallback((...args) => {
        if (timeout) {
            console.log("გასულია", timeout.current)
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => { callback(...args) }, delay)
    }, [callback, delay])
}