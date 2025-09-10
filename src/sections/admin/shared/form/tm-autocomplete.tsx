// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type TmAutocompleteProps = {
  name: string;
  label: string;
  helperText: ReactNode;
  options: string[];
};

export default function TmAutocomplete({ name, label, helperText, options, ...other }: TmAutocompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete           
            options={options}
          {...field}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
