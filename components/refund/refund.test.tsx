import * as ReactRedux from 'react-redux'

import { render, screen, fireEvent } from 'tests/test-utils'
import { transactionMock } from 'tests/mocks'

import { Refund } from './refund'

const elementIDs = {
    refundRefunded: 'refund-refunded',
    refundLoading: 'refund-loading',
    refundButton: 'refund-button',
    refundDialog: 'refund-dialog',
    refundDialogSubmit: 'refund-dialog-submit',
    refundDialogCancel: 'refund-dialog-cancel',
} as const;

describe('Refund', () => {
    const mockDispatch = jest.fn();
    beforeAll(() => {
        jest.spyOn(
            ReactRedux,
            'useDispatch'
        ).mockImplementation(() => mockDispatch)
    });
    
    beforeEach(() => {
        jest.spyOn(
            ReactRedux,
            'useDispatch'
        ).mockClear();
    });

    it('should render Refund component', () => {
        render(<Refund transaction={transactionMock[0]}  />)

        expect(screen.getByRole('button')).toBeTruthy()
    });

    it('should render refunded label component', () => {
        render(<Refund transaction={{
            ...transactionMock[0],
            refunded: true
        }}  />)

        expect(screen.getByTestId(elementIDs.refundRefunded)).toBeTruthy()
    });

    it(`should render loading component when status ='REFUND_PENDING'`, () => {
        render(<Refund transaction={{
            ...transactionMock[0],
            status: 'REFUND_PENDING'
        }}  />)

        expect(screen.getByTestId(elementIDs.refundLoading)).toBeTruthy()
    });

    it('should render confirmation dialog on refund and close on cancel', () => {
        render(<Refund transaction={transactionMock[0]}  />)

        const buttonElement = screen.getByTestId(elementIDs.refundButton)
        fireEvent.click(buttonElement)

        expect(screen.getByTestId(elementIDs.refundDialog)).toBeTruthy()

        const dialogElementCancel = screen.getByTestId(elementIDs.refundDialogCancel)
        fireEvent.click(dialogElementCancel)

        expect(screen.queryByTestId(elementIDs.refundDialog)).toBeFalsy()
    });

    it('should render confirmation dialog on refund and dispatch on submit', () => {
        render(<Refund transaction={transactionMock[0]}  />)

        const buttonElement = screen.getByTestId(elementIDs.refundButton)
        fireEvent.click(buttonElement)

        expect(screen.getByTestId(elementIDs.refundDialog)).toBeTruthy()

        const dialogElementSubmit = screen.getByTestId(elementIDs.refundDialogSubmit)
        fireEvent.click(dialogElementSubmit)

        expect(screen.queryByTestId(elementIDs.refundDialog)).toBeFalsy()

        expect(mockDispatch).toHaveBeenCalled()
    });
});
