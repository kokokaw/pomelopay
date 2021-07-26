import { TransactionData } from 'pages/api/transaction'

import { API_TRANSACTION_HISTORY } from 'config'
import { queryParams } from 'utils'

// Added sleep to mimic the loading state.
const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

export const getTransactionHistory = async (options: any = {}): Promise<TransactionData[]> => {
    const requestOptions = {
        ...options,
    };

    let url = API_TRANSACTION_HISTORY
    if(options.queryParams) {
        url += `?${queryParams(options.queryParams)}`
        delete requestOptions.queryParams
    }

    await sleep(500);
    let response = await fetch(url, requestOptions)
    let responseJson = await response.json()

    return responseJson
}

export const refundTransactionHistory = async (id: number): Promise<TransactionData> => {
    await sleep(2000);
    let response = await fetch(API_TRANSACTION_HISTORY, {
        method: 'PUT',
        body: JSON.stringify({ id })
    })
    let responseJson = await response.json()

    return responseJson
}
