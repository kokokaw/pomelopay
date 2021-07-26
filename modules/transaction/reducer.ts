import { ActionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

import {
    TransactionHistoryState,
    TransactionDataType,
    TodoActions,
    LoadTransactionHistorySuccess,
    RefundTransaction,
    RefundTransactionSuccess
} from './types'

export const initialState: TransactionHistoryState = {
    loading: false,
    error: null,
    data: null
}

const reducer = (state: TransactionHistoryState = initialState, action: TodoActions) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...(action as any).payload }
        }

        case ActionTypes.LOAD_TRANSACTION_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }

        case ActionTypes.LOAD_TRANSACTION_HISTORY_SUCCESS:
            return {
                data: (action as LoadTransactionHistorySuccess).payload,
                loading: false,
                error: false
            }
    
        case ActionTypes.LOAD_TRANSACTION_HISTORY:
            return {
                ...state,
                loading: true,
                error: false
            }
    
        case ActionTypes.REFUND_TRANSACTION:
            const id = (action as RefundTransaction).payload
            return {
                ...state,
                data: [
                    ...(state.data as TransactionDataType[]).map(data => {
                        if (data.id === id) {
                            delete data.status
                            return {
                                ...data,
                                status: 'REFUND_PENDING'
                            }
                        }
                        return data;
                    })
                ]
            }
    
        case ActionTypes.REFUND_TRANSACTION_SUCCESS:
            const { data: newTransaction, id: transactionID } = (action as RefundTransactionSuccess).payload
            return {
                ...state,
                data: [
                    newTransaction,
                    ...(state.data as TransactionDataType[]).map(data => {
                        if (data.id === transactionID) {
                            delete data.status
                            return {
                                ...data,
                                refunded: true
                            }
                        }
                        return data;
                    })
                ]
            }

        default:
            return state
    }
}

export default reducer
