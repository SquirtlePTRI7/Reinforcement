import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { LeaderboardRow } from '../../types';

const LeaderboardStatsBlock = (props: any) => {
  const { leaderboardRows } = props;
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 400 }} aria-label="Leaderboard">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardRows.map((row: LeaderboardRow) => (
            <TableRow
              key={row.key}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => navigate(`/${row.username}`)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                {row.username}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardStatsBlock;
