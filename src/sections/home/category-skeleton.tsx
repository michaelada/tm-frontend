
// ----------------------------------------------------------------------

import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export function CategorySkeleton({
                                      sx,
                                      amount = 16,
                                      ...other
                                    }: PaperProps & {
  amount?: number;
}) {
  return [...Array(amount)].map((_, index) => (
    <Paper key={index} variant="outlined" sx={{ borderRadius: 2, ...sx }} {...other}>
      <Stack sx={{ p: 1 }}>
        <Skeleton sx={{ pt: '100%' }} />
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 2 }}>
        <Skeleton sx={{ width: 0.5, height: 16 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row">
            <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
            <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
            <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
          </Stack>
          <Skeleton sx={{ width: 40, height: 16 }} />
        </Stack>
      </Stack>
    </Paper>
  ));
}
