import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export function ProductsHero({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      sx={{
        height: { md: 360 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <h1>New In</h1>
      <h1>Your Favourites</h1>
    </Box>
  );
}
