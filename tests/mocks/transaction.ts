export const transactionMock = [
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
        id: 12345,
        dateTime: 1626849035000,
        transactionType: 'deposit',
        transactionTitle: 'Funds Transfer',
        transactionDescription: 'I-Bank',
        transactionInfo: 'ROBERT DOWNEY JR',
        amount: 20.00,
        balance: 14820.00
    }
]

export const transactionRefund = {
    id: 12347,
    dateTime: 1627006363000,
    transactionType: 'deposit',
    transactionTitle: 'Refund Transaction',
    transactionDescription: 'SPC 3337 CHANGI RD',
    transactionInfo: '8731-2934-2940-1234',
    amount: 23.36,
    balance: 14843.36
}