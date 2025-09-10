// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type RHFTextFieldProps = {
  name: string,
  helperText: ReactNode,
  label: string;
  multiline?: boolean;
  maxRows?: number;
};

export default function TmTextField({ name, helperText, label, multiline, maxRows, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      // key={`ID-${Math.random()*10000}`}
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
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
