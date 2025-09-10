import { ReactNode } from 'react';

// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

type TmSwitchProps = {
  name: string;
  label: string;
  helperText?: ReactNode;
};

export default function TmSwitch({ name, helperText, label, ...other }: TmSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel label={label} control={<Switch {...field} checked={field.value} />} {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
