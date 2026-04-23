// components/CustomPagination.jsx
import React from 'react'
import {
    Pagination,
    Stack,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Box,
    Paper
} from '@mui/material'

const CustomPagination = ({
    page,
    count,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions = [5, 10, 20, 50]
}) => {
    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: 0,
                width: '100%',
                mt: 3,
                zIndex: 10
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255,255,255,0.9)'
                }}
            >
                {/* Left side */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" sx={{
                        fontWeight: 500, display: 'flex',
                        alignItems: 'center'
                    }} >
                        Rows per page:
                    </Typography>

                    <FormControl size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={(e) => onRowsPerPageChange(e.target.value)}
                            sx={{
                                borderRadius: 2,
                                minWidth: 80
                            }}
                        >
                            {rowsPerPageOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Center */}
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Page {page} of {count}
                </Typography>

                {/* Right side */}
                <Pagination
                    page={page}
                    count={count}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    onChange={(e, value) => onPageChange(value)}
                />
            </Paper>
        </Box>
    )
}

export default CustomPagination