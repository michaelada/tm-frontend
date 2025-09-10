import type { AlertColor } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';

import * as React from 'react';

import { Fade, Alert, Snackbar } from '@mui/material';

type NotifyProps = {
    notification: string | undefined;
    open?: boolean
    duration?: number | undefined;
    onClose: Function;
    alert?: AlertColor;
}
export default function  Notify({notification, duration, open, onClose, alert} : NotifyProps) {
  
  const delay = duration || 5000;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    onClose();
  };

  return (
      <Snackbar
        open={open}
        autoHideDuration={delay}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Fade}    
        sx={{ top: { xs: 80 } }}    
      >
        <Alert
            onClose={handleClose}
            severity={alert || 'success'}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {notification}
        </Alert>
  </Snackbar>
  );
}