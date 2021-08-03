import React from 'react'
import { render, screen, fireEvent } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'

import { Search } from './search'

const elementIDs = {
    searchContainer: 'search-container',
    searchLoading: 'search-loading',
    searchButton: 'search-button',
    searchClear: 'search-clear',
} as const;

describe('Search', () => {
    const callbackMock = jest.fn()

    it('should render Search component', () => {
        render(<Search callback={callbackMock} isLoading={false}  />)

        expect(screen.getByTestId(elementIDs.searchContainer)).toBeTruthy()
    });

    it('should show loading', () => {
        render(<Search callback={callbackMock} isLoading={true}  />)

        expect(screen.getByTestId(elementIDs.searchLoading)).toBeTruthy()
    });

    it('should call callback on submit', () => {
        const nextTextValue = 'withdrawal';
        render(<Search callback={callbackMock} isLoading={false}  />)

        const textElement = screen.getByPlaceholderText('Search...')
        fireEvent.change(textElement, {target: {value: nextTextValue}})

        const buttonElement = screen.getByTestId(elementIDs.searchButton)
        fireEvent.click(buttonElement)

        expect(callbackMock).toHaveBeenCalledWith(nextTextValue)
    });

    it('should call callback on press enter', () => {
        const nextTextValue = 'withdrawal';
        render(<Search callback={callbackMock} isLoading={false}  />)

        const textElement = screen.getByPlaceholderText('Search...')
        fireEvent.change(textElement, {target: {value: nextTextValue}})
        userEvent.type(textElement, '{enter}');

        expect(callbackMock).toHaveBeenCalledWith(nextTextValue)
    });

    it('should call callback with empty value on clear', () => {
        const nextTextValue = 'withdrawal';
        render(<Search callback={callbackMock} isLoading={false}  />)

        const textElement = screen.getByPlaceholderText('Search...')
        fireEvent.change(textElement, {target: {value: nextTextValue}})
        
        const cancelElement = screen.getByTestId(elementIDs.searchClear)
        fireEvent.click(cancelElement)

        expect(callbackMock).toHaveBeenCalledWith('')
    });
});
