import { TransactionData } from 'pages/api/transaction'

import {
	TransactionHistoryQuery,
	RefundTransactionSuccessPayload
} from './types'

export const ActionTypes = {
	LOAD_TRANSACTION_HISTORY_FAILURE: 'LOAD_TRANSACTION_HISTORY_FAILURE',
	LOAD_TRANSACTION_HISTORY: 'LOAD_TRANSACTION_DATA',
	LOAD_TRANSACTION_HISTORY_SUCCESS: 'LOAD_TRANSACTION_DATA_SUCCESS',
	LOADING_TRANSACTION_HISTORY: 'LOADING_TRANSACTION_DATA',
	REFUND_TRANSACTION: 'REFUND_TRANSACTION',
	REFUND_TRANSACTION_SUCCESS: 'REFUND_TRANSACTION_SUCCESS',
	REFUND_TRANSACTION_FAILURE: 'REFUND_TRANSACTION_FAILURE',
}

export function loadTransactionHistoryFailure() {
	return {
		type: ActionTypes.LOAD_TRANSACTION_HISTORY_FAILURE
	}
}

export function loadTransactionHistory(payload?: TransactionHistoryQuery) {
	return {
		type: ActionTypes.LOAD_TRANSACTION_HISTORY,
		payload
	}
}

export function loadTransactionHistorySuccess(payload: TransactionData[]) {
	return {
		type: ActionTypes.LOAD_TRANSACTION_HISTORY_SUCCESS,
		payload
	}
}

export function refundTransaction(payload: number) { 
	return {
		type: ActionTypes.REFUND_TRANSACTION,
		payload
	}
}

export function refundTransactionSuccess(payload: RefundTransactionSuccessPayload) { 
	return {
		type: ActionTypes.REFUND_TRANSACTION_SUCCESS,
		payload
	}
}

export function refundTransactionFailure() {
	return {
		type: ActionTypes.REFUND_TRANSACTION_FAILURE
	}
}
