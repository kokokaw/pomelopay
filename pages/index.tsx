import React, { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'

import { Layout } from 'components/layout'
import { TableComponent, ValueProps } from 'components/table'
import { Search } from 'components/search'
import { Refund } from 'components/refund'
import { TransactionData } from 'pages/api/transaction'
import { AppState } from 'modules'
import { loadTransactionHistory } from 'modules/transaction'
import { dateFormat, isWithdrawal, numberFormat } from 'utils'

interface TransactionDescriptionProps {
    transaction: TransactionData;
}

const TransactionDescription:React.FC<TransactionDescriptionProps> = ({ transaction }) => (
    <>
        <div>{transaction.transactionTitle}</div>
        <div>{transaction.transactionDescription}</div>
        <div>{transaction.transactionInfo}</div>
    </>
)

const transactionDetailsMapper = (transactions: TransactionData[] | null): ValueProps[][] => {
    return (transactions || []).map((transaction: TransactionData) => {
        const isWithdraw = isWithdrawal(transaction.transactionType);
        const isRefunded = !!transaction.refunded;
        return [
            { align: 'left', value: dateFormat(transaction.dateTime) },
            { align: 'left', value: <TransactionDescription transaction={transaction} /> },
            { align: 'right', value: isWithdraw && numberFormat(transaction.amount) },
            { align: 'right', value: !isWithdraw && numberFormat(transaction.amount) },
            { align: 'right', value: numberFormat(transaction.balance) },
            { align: 'right', value: isWithdraw && <Refund transaction={transaction} />}
        ]
    })
}

export default function Dashboard() {
    const { loading, data } = useSelector((state: AppState) => state.transaction)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTransactionHistory())
    }, [dispatch])

    const searchCallback = (search: string) => {
        dispatch(loadTransactionHistory({ queryParams: { search }}))
    }

    return (
        <Layout>
            <Head>
                <title>Accept Card Payments | Pomelo Pay</title>
            </Head>

            <div data-testid='transaction-container'>
                {data && <Search callback={searchCallback} isLoading={loading} />}
                
                <TableComponent
                    header={[
                        { align: 'left', value: 'Date' }, 
                        { align: 'left', value: 'Description' }, 
                        { align: 'right', value: 'Withdrawal (-)' }, 
                        { align: 'right', value: 'Deposit (+)' }, 
                        { align: 'right', value: 'Balance (SGD)' },
                        { align: 'right', value: '' }
                    ]}
                    data={transactionDetailsMapper(data)}
                    id='transactionList'
                    isLoading={!data}
                />         
            </div>
        </Layout>
    )
}
