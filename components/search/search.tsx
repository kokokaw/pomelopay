import React, { ChangeEvent, useCallback, useState } from 'react'

import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useStyles } from './search.styles'

interface SearchProps {
    callback: (search: string) => void;
    isLoading: boolean;
}

export const Search:React.FC<SearchProps> = ({ callback, isLoading }) => {
    const classes = useStyles()
    const [value, setValue] = useState<string>('')

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onSubmitSearch = useCallback(() => {
        callback(value)
    }, [callback, value])

    const onClearSearch = useCallback(() => {
        setValue(() => {
            callback('')
            return ''
        })
    }, [callback])

    return (
        <div className={classes.searchContainer} data-testid='search-container'>
            <div className={classes.search}>
                <InputBase
                    placeholder="Search..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={value}
                    onChange={onChangeSearch}
                    onKeyPress={(e) => {
                        /* istanbul ignore else */
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            onSubmitSearch()
                        }
                    }}
                />
                { value && <Button size='small' onClick={onClearSearch} className={classes.button}  data-testid='search-clear'><Close /></Button>}
                <Button
                    size='small'
                    onClick={onSubmitSearch}
                    disabled={isLoading}
                    className={classes.button}
                    data-testid='search-button'
                    name='search-button'
                >
                    {isLoading ? <CircularProgress size={20} data-testid='search-loading' /> : <SearchIcon />}
                </Button>
            </div>
        </div>
    )
}
