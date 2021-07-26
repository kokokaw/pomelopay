
import { TransactionData } from 'pages/api/transaction'

import { ActionTypes } from './actions';

export type TRANSACTION_STATUS = 'REFUND_PENDING'

export interface TransactionDataType extends TransactionData {
    status?: TRANSACTION_STATUS;
}

export interface TransactionHistoryState {
    loading: boolean;
    error: string | null;
    data: TransactionDataType[] | null
}

export interface LoadTransactionHistoryFailure {
    type: typeof ActionTypes.LOAD_TRANSACTION_HISTORY_FAILURE;
}

export interface TransactionHistoryQuery {
    queryParams?: {
        search: string;
    };
}

export interface LoadTransactionHistory {
    type: typeof ActionTypes.LOAD_TRANSACTION_HISTORY;
    payload?: TransactionHistoryQuery;
}

export interface LoadTransactionHistorySuccess {
    type: typeof ActionTypes.LOAD_TRANSACTION_HISTORY_SUCCESS;
    payload: TransactionDataType[]
}

export interface RefundTransactionSuccessPayload {
    data: TransactionDataType;
    id: number
}

export interface RefundTransaction {
    type: typeof ActionTypes.REFUND_TRANSACTION_SUCCESS;
    payload: number
}

export interface RefundTransactionSuccess {
    type: typeof ActionTypes.REFUND_TRANSACTION_SUCCESS;
    payload: RefundTransactionSuccessPayload
}

export type TodoActions =
    | LoadTransactionHistoryFailure
    | LoadTransactionHistory
    | LoadTransactionHistorySuccess
    | RefundTransaction
    | RefundTransactionSuccess
