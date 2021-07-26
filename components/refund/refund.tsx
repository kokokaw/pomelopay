import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { refundTransaction, TransactionDataType } from 'modules/transaction'

interface RefundComponentProps {
    transaction: TransactionDataType
}

export const Refund:React.FC<RefundComponentProps> = ({ transaction }) => {
    const [ diaglogOpen, setDiaglogOpen ] = useState<boolean>(false);
    const dispatch = useDispatch()
    const { id, refunded, status } = transaction;
    const isRefunded = !!refunded;

    const isRefundPending = status === 'REFUND_PENDING'

    const onRefund = useCallback(() => {
        setDiaglogOpen(false)
        dispatch(refundTransaction(id))
    }, [ id ]);

    const onConfirmRefund = () => {
        setDiaglogOpen(true)
    } 

    const onCloseDiaglogRefund = () => {
        setDiaglogOpen(false)
    }

    if (isRefunded) return <Chip size='small' label='Refunded' data-testid='refund-refunded' />
    return (
        <>
            {
                diaglogOpen && (
                    <Dialog
                        open={diaglogOpen}
                        onClose={onCloseDiaglogRefund}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                        data-testid='refund-dialog'
                    >
                        <DialogTitle id='alert-dialog-title'>{'Confirmation Request'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-description'>
                                Are you sure you want to refund this transaction?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={onCloseDiaglogRefund} color='primary' data-testid='refund-dialog-cancel'>
                            Cancel
                        </Button>
                        <Button onClick={onRefund} color='primary' autoFocus data-testid='refund-dialog-submit'>
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <Button size='small' onClick={onConfirmRefund} disabled={isRefundPending} data-testid='refund-button'>
                {isRefundPending ? <CircularProgress size={14} data-testid='refund-loading' /> : 'refund'}
            </Button>
        </>
    )
}
