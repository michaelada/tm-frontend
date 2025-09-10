import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, AnimateText, MotionContainer, animateTextClasses } from 'src/components/animate';

// ----------------------------------------------------------------------

export function HomeHero({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      sx={{
        height: { md: 320 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 10 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={['Welcome to the new', 'Tom Martin & Co', 'Webstore!']}
            variants={varFade({ distance: 24 }).inUp}
            sx={{
              color: 'common.black',
              [`& .${animateTextClasses.line}[data-index="1"]`]: { color: 'primary.main' },
            }}
          />
          <m.div variants={varFade({ distance: 24 }).inUp}>
            <Typography
              variant="h4"
              sx={{ mt: 3, color: 'common.black', fontWeight: 'fontWeightSemiBold' }}
            >
              Your Quality Brand House (1)
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
