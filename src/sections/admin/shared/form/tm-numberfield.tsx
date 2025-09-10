// form
import type { ReactNode } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

type RHFNumberFieldProps = {
  name: string,
  helperText: ReactNode,
  label: string;
  multiline?: boolean;
  maxRows?: number;
};

export default function TmNumberField({ name, helperText, label, multiline, maxRows, ...other }: RHFNumberFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          inputProps={{ type: 'number'}}
          {...field}
          label={label}
          // fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          autoComplete="off"
          id={`ID-${Math.random()*10000}`}
          multiline
          maxRows={maxRows}
          />
      )}
    />
  );
}
