import React from 'react'
import * as ReactRedux from 'react-redux'

import { render, screen, fireEvent } from './test-utils'

import Dashboard from 'pages/index'

import { initialStateMock, transactionMock } from './mocks'

const elementIDs = {
    transactionContainer: 'transaction-container',
    tableContainer: 'table-container',
    searchButton: 'search-button',
    searchClear: 'search-clear',
} as const;

const stateWithDataMock = {
    initialState: {
        ...initialStateMock,
        transaction: {
            ...initialStateMock.transaction,
            loading: false,
            data: transactionMock
        }
    }
}

describe('Dashboard', () => {
    const mockDispatch = jest.fn();
    beforeAll(() => {
        jest.spyOn(
            ReactRedux,
            'useDispatch'
        ).mockImplementation(() => mockDispatch)
    });
    
    beforeEach(() => {
        jest.spyOn(
            ReactRedux,
            'useDispatch'
        ).mockClear();
    });

    it('should render Dashboard component', () => {
        render(<Dashboard />)

        expect(screen.getByTestId(elementIDs.transactionContainer)).toBeTruthy()
    })

    it('should display table if transaction is loaded', () => {
        render(<Dashboard />, stateWithDataMock)

        expect(screen.getByTestId(elementIDs.tableContainer)).toBeTruthy()
    })

    it('should trigger dispatch when callback is called', () => {
        render(<Dashboard />, stateWithDataMock)

        const textElement = screen.getByPlaceholderText('Search...')

        expect(textElement).toBeTruthy()
        fireEvent.change(textElement, {target: {value: 'withdrawal'}})

        expect(screen.getByTestId(elementIDs.searchClear)).toBeTruthy()

        const buttonElement = screen.getByTestId(elementIDs.searchButton)
        expect(buttonElement).toBeTruthy()
        fireEvent.click(buttonElement)

        expect(mockDispatch).toHaveBeenCalled()
    })
});
