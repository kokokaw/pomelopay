import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
    ActionTypes,
    loadTransactionHistoryFailure,
    loadTransactionHistorySuccess,
    refundTransactionFailure,
    refundTransactionSuccess
} from './actions'

import { TransactionData } from 'pages/api/transaction'

import {
    getTransactionHistory,
    refundTransactionHistory
} from './service'

import {
    LoadTransactionHistory,
    RefundTransaction
} from './types'

function* loadTransactionHistorySaga({ payload }: LoadTransactionHistory) {
    try {
        const response: TransactionData[] = yield call(getTransactionHistory, payload)

        yield put(loadTransactionHistorySuccess(response))
    } catch (err) {
        yield put(loadTransactionHistoryFailure())
    }
}

function* refundTransactionSaga({ payload }: RefundTransaction) {
    try {
        const response: TransactionData = yield call(refundTransactionHistory, payload)

        yield put(refundTransactionSuccess({
            data: response, 
            id: payload
        }))
    } catch (err) {
        yield put(refundTransactionFailure())
    }
}

function* rootSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_TRANSACTION_HISTORY, loadTransactionHistorySaga),
        takeLatest(ActionTypes.REFUND_TRANSACTION, refundTransactionSaga),
    ])
}

export default rootSaga
