// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { dateFormat } from 'utils'

export type TransactionData = {
    id: number,
    dateTime: number,
    transactionType: string,
    transactionTitle: string,
    transactionDescription: string,
    transactionInfo: string,
    amount: number,
    balance: number,
    refunded?: boolean
}

let mockTransactionData: TransactionData[] = [
    {
        id: 12347,
        dateTime: 1627006353000,
        transactionType: 'withdrawal',
        transactionTitle: 'Debit Card Transaction',
        transactionDescription: 'SPC 3337 CHANGI RD',
        transactionInfo: '8731-2934-2940-1234',
        amount: 23.36,
        balance: 14789.84,
        refunded: false
    },
    {
        id: 12346,
        dateTime: 1626950580000,
        transactionType: 'withdrawal',
        transactionTitle: 'Debit Card Transaction',
        transactionDescription: 'GOOGLE*SUPERCELL',
        transactionInfo: '8731-2934-2940-1234',
        amount: 6.98,
        balance: 14813.20,
        refunded: false
    },
    {
        id: 12345,
        dateTime: 1626849035000,
        transactionType: 'deposit',
        transactionTitle: 'Funds Transfer',
        transactionDescription: 'I-Bank',
        transactionInfo: 'ROBERT DOWNEY JR',
        amount: 20.00,
        balance: 14820.00
    },
    {
        id: 12344,
        dateTime: 1626829281000,
        transactionType: 'withdrawal',
        transactionTitle: 'Debit Card Transaction',
        transactionDescription: 'SHOPEE SINGAPORE MP',
        transactionInfo: '8731-2934-2940-1234',
        amount: 200.00,
        balance: 14800.00,
        refunded: false
    },
    {
        id: 12343,
        dateTime: 1626753681000,
        transactionType: 'deposit',
        transactionTitle: 'Salary',
        transactionDescription: 'POMELO PAY PTE. LIMITED',
        transactionInfo: '8731-2934-2940-1234',
        amount: 15000.00,
        balance: 15000.00
    }
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TransactionData | TransactionData[]>
) {
    if (req.method === 'GET') {
        const { search } = req.query;
        if (!search) res.status(200).json(mockTransactionData)

        res.status(200).json(mockTransactionData.filter((transaction: TransactionData) => {
            return Object.keys(transaction).find((transactionKey: string) => {
                let value = transaction[transactionKey as keyof TransactionData];
                if (transactionKey === 'dateTime') {
                    value = dateFormat(Number(value));
                }
                return String(value).toLowerCase().indexOf(String(search).toLowerCase()) >= 0
            })
        }));
    } else if (req.method === 'PUT') {
        const { id } = JSON.parse(req.body);

        const transaction = mockTransactionData.find((transaction) => transaction.id === id);
        const latestTransaction = mockTransactionData[0];

        if (transaction && latestTransaction) {
            const newTransaction = {
                id: latestTransaction.id + 1,
                dateTime: new Date().getTime(),
                transactionType: 'deposit',
                transactionTitle: 'Refund Transaction',
                transactionDescription: transaction?.transactionDescription,
                transactionInfo: transaction?.transactionInfo,
                amount: transaction.amount,
                balance: latestTransaction.balance + transaction.amount
            }
            mockTransactionData = [
                newTransaction,
                ...mockTransactionData.map(transaction => {
                    if (transaction.id === id) {
                        return {
                            ...transaction,
                            refunded: true
                        }
                    }
                    return transaction
                })
            ]
            res.status(200).json(newTransaction);
        } else {
            res.status(200).json([]);
        }
    }
}
