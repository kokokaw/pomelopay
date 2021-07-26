import {
    ActionTypes,
    loadTransactionHistoryFailure,
    loadTransactionHistory,
    loadTransactionHistorySuccess,
    refundTransaction,
    refundTransactionSuccess,
    refundTransactionFailure,
} from './actions'

import { transactionMock } from 'tests/mocks';

describe('Transaction redux actions', () => {
    it('loadTransactionHistoryFailure', () => {
        expect(loadTransactionHistoryFailure()).toEqual({
            type: ActionTypes.LOAD_TRANSACTION_HISTORY_FAILURE
        })
    })

    it('loadTransactionHistory', () => {
        const mockPayload = {
            queryParams: {
                search: 'withdraw'
            }
        }
        expect(loadTransactionHistory(mockPayload)).toEqual({
            type: ActionTypes.LOAD_TRANSACTION_HISTORY,
            payload: mockPayload
        })
    })

    it('loadTransactionHistorySuccess', () => {
        expect(loadTransactionHistorySuccess(transactionMock)).toEqual({
            type: ActionTypes.LOAD_TRANSACTION_HISTORY_SUCCESS,
            payload: transactionMock
        })
    })

    it('refundTransaction', () => {
        expect(refundTransaction(1)).toEqual({
            type: ActionTypes.REFUND_TRANSACTION,
            payload: 1
        })
    })

    it('refundTransactionSuccess', () => {
        const mockPayload = {
            data: transactionMock[0],
            id: 12347
        }
        expect(refundTransactionSuccess(mockPayload)).toEqual({
            type: ActionTypes.REFUND_TRANSACTION_SUCCESS,
            payload: mockPayload
        })
    })

    it('refundTransactionFailure', () => {
        expect(refundTransactionFailure()).toEqual({
            type: ActionTypes.REFUND_TRANSACTION_FAILURE
        })
    })
});
