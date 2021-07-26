export const numberFormat = (value: number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(value);

export const dateFormat = (timestamp: number) => {
    const transactionDate = new Date(timestamp)
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(transactionDate)
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(transactionDate)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(transactionDate)
    
    return `${da}-${mo}-${ye}`
}
