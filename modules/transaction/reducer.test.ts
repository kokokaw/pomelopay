import { HYDRATE } from 'next-redux-wrapper'

import { ActionTypes } from './actions'
import reducer, { initialState } from './reducer'
import { TransactionHistoryState } from './types'

import { transactionMock, transactionRefund } from 'tests/mocks';

describe('Transaction redux reducer', () => {
    it.each<
            [string, any, any, TransactionHistoryState | undefined]
        >([
            [HYDRATE, null, {...initialState}, undefined],
            [ActionTypes.LOAD_TRANSACTION_HISTORY_FAILURE, null, {...initialState, loading: false, error: true}, initialState],
            [ActionTypes.LOAD_TRANSACTION_HISTORY_SUCCESS, transactionMock, {loading: false, error: false, data: transactionMock}, initialState],
            [ActionTypes.LOAD_TRANSACTION_HISTORY, null, {...initialState, loading: true, error: false}, initialState],
            [
                ActionTypes.REFUND_TRANSACTION,
                transactionMock[0].id,
                {
                    loading: false,
                    error: null,
                    data: [
                        {
                            ...transactionMock[0],
                            status: 'REFUND_PENDING'
                        },
                        transactionMock[1]
                    ]
                },
                {
                    ...initialState,
                    data: transactionMock
                }
            ],
            [
                ActionTypes.REFUND_TRANSACTION_SUCCESS, 
                {
                    data: transactionRefund,
                    id: transactionMock[0].id
                },
                {
                    data: [
                        transactionRefund,
                        {
                            ...transactionMock[0],
                            refunded: true
                        },
                        transactionMock[1]
                    ],
                    loading: false,
                    error: null
                },
                {
                    ...initialState,
                    data: transactionMock
                }
            ],
            ['DEFAULT', null, initialState, initialState],
        ])(
            'should call right reducer %s',
            (action, payload, expectedValue, initState) => {
                const actionArg = {
                    type: action,
                    ...payload ? { payload } : {}
                }
                expect(reducer(initState, actionArg)).toEqual(expectedValue)
            }
        )
})