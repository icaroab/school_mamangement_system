import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination,Box,Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows , ...props}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <Box >
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell >
                               List
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody >
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        
                                        <StyledTableCell sx={{display:'flex'}}>
                                            <Typography sx={styles.typo}>
                                            {
                                                row.isAnswered&&row.isAnswered ? <DoneIcon/>:''
                                            }
                                            </Typography>
                                            <Typography>
                                            {row.name}

                                            </Typography>
                                            </StyledTableCell>
                                        <StyledTableCell sx={styles.ButtonContainer} >
                                            {
                                                !row.isAnswered?<ButtonHaver row={row} />:''
                                            }
                                            {
                                                console.log(row)
                                            }
                                            
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5));
                    setPage(0);
                }}
            />
        </Box>
    )
}

export default TableTemplate


const styles = {
   
    ButtonContainer: {
       display:'flex',
       justifyContent:'end'
    },
    typo:{
        minWidth:'30px',
        color:'green'
    }
};