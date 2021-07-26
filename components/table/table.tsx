import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import Skeleton from 'react-loading-skeleton';

import { StyledTableCell, StyledTableRow, useStyles } from './table.styles'

export interface ValueProps {
    align: 'left' | 'right';
    value: any;
}

export interface TableComponentProps {
    header: ValueProps[];
    data: ValueProps[][];
    id: string;
    isLoading: boolean;
}

export const TableComponent:React.FC<TableComponentProps> = ({
    header,
    data,
    id,
    isLoading
}) => {
    const styles = useStyles();
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (isLoading) {
        return (
            <div className={styles.skeletonWContainer} data-testid='table-skeleton'>
                <h1><Skeleton /></h1>
                <Skeleton count={3} />
            </div>
        )
    }

    return (
        <TableContainer component={Paper} data-testid="table-container">
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {header.map(({ align, value }: ValueProps, headerKey: number) => (
                            <StyledTableCell align={align} key={`${id}-header-${headerKey}`}>{value}</StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {data.map((rows, rowKey) => (
                        <StyledTableRow key={`${id}-row-${rowKey}`}>
                            {
                                rows.map(({ align, value }: ValueProps, cellKey: number) =>
                                    <StyledTableCell align={align} key={`${id}-cell-${cellKey}`}>{value}</StyledTableCell>)
                            }
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
