import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Markdown from 'react-markdown';

// ----------------------------------------------------------------------

type Props = {
  description?: string;
  sx?: SxProps<Theme>;
};

export function ProductDetailsDescription({ description, sx }: Props) {
  return <Box sx={{p:2}}><Markdown>{description}</Markdown></Box>;
}
