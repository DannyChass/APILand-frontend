import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationApiHub({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        size="small"
        showFirstButton
        showLastButton />
    </Stack>
  );
}