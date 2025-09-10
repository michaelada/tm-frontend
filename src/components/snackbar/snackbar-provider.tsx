import type { AlertColor } from '@mui/material';

import { useMemo, useState, useContext, createContext } from 'react';

import { Alert, Snackbar } from '@mui/material';

class Snack {
    message?: string;

    color?: AlertColor;

    autoHideDuration?: number;

    open: boolean;

    constructor(data: Snack) {
        this.message = data.message || '';
        this.color = data.color || 'info';
        this.autoHideDuration = data.autoHideDuration || 6000;
        this.open = data.open;
    }
}

export { Snack };

export type ISnack = {
    message: string;
    color: string;
    open: boolean;
};


export type SnackDefaultValue = {
    snack: Snack;
    setSnack: React.Dispatch<React.SetStateAction<Snack>>;
};

export const SnackbarContext = createContext<SnackDefaultValue>({ snack: new Snack({ open: false }), setSnack: () => { } });

type Props = {
    children: React.ReactNode;
};

export const useSnackbar = () => useContext(SnackbarContext);

export function SnackboxProvider({ children }: Props) {
    const [snack, setSnack] = useState(new Snack({ open: false }));

      const memoizedValue = useMemo(
        () => ({
          snack,
          setSnack,
        }),
        [snack, setSnack]
      );


    return (
        <SnackbarContext.Provider value={memoizedValue}>
            <Snackbar open={snack.open} autoHideDuration={snack.autoHideDuration} >
                <Alert severity={snack.color}>
                    {snack.message || ''}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}
