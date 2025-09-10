import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

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

// export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);
export const SnackbarContext = createContext<SnackDefaultValue>({ snack: new Snack({ open: false }), setSnack: () => { } });

type Props = {
    children: React.ReactNode;
};

export const useSnackbar = () => useContext(SnackbarContext);

export function SnackboxProvider({ children }: Props) {
    const [snack, setSnack] = useState(new Snack({ open: false }));

    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    // }

    // setSnack(new Snack({ color: snack.color, open: false }));

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
    // const { state, setState } = useSetState<ISnack>({
    //     message: '',
    //     color: '',
    //     open: false,
    // });


    // const setSnack = useCallback((newsnack: ISnack) => {
    //     setState(newsnack);
    // }, [setState]);

  
    // return (
    //     <SnackbarContext.Provider value={memoizedValue}>
    //         <Snackbar open={state.open}>
    //             <Alert>
    //                 {state.message}
    //             </Alert>
    //         </Snackbar>
    //         {children}
    //     </SnackbarContext.Provider>
    // )
}
