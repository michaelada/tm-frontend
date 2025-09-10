import type { Theme, SxProps } from '@mui/material/styles';

import Markdown from 'react-markdown';

import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  description?: string;
  sx?: SxProps<Theme>;
};

export function ProductDetailsDescription({ description, sx }: Props) {
  return <Box sx={{p:2}}><Markdown>{description}</Markdown></Box>;
}
