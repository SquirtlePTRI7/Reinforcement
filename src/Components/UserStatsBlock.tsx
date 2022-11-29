import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserStatsBlock = (props: any ) => {
  const { userStats } = props;

  return (
    <TableContainer component={Paper}>
        <Table sx={{minWidth: 400}} aria-label='User Stats'>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align='right'>Current Score: {userStats.currentScore}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {userStats.actions.map((row: any) => (
                    <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>{row.label}</TableCell>
                        <TableCell align='right'>{row.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
};

export default UserStatsBlock;