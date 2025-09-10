// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { ReactNode, useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------
type TmAsyncAutocompleteProps = {
  name: string;
  label: string;
  helperText: ReactNode;
  url: string;
  onChange?: Function;
};

export default function TmAsyncAutocomplete({ name, label, helperText, url, onChange, ...other }: TmAsyncAutocompleteProps) {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
       axios.get(url).then(response => {
           setLoading(false);
            setOptions(response.data);
      })
      .catch(err => {
           setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          options={options}
          loading={loading}
          // isOptionEqualToValue={(option, value) => { 
          //   console.log(`Option`, option);
          //   console.log(`Value`, value);
          //   return option.id === value.id
          //   }
          // }
          // getOptionLabel={(option) => { 
          //     console.log(`getOptionLabel`, option);
          //     return option.label;
          //   }
          // }
          // onInputChange={(event: any, newValue: IOption | null) => {
          //   console.log(newValue);
          // }}
          // onChange={(event: any, newValue: IOption | null) => {
          //   setValue(newValue);
          // }}
          // onChange={(e) => onChange(e)} 
          {...field}
          onChange={(_event, newValue) => {
              setValue(name, newValue, { shouldValidate: true });
              if(onChange) {
                onChange(newValue);
              }
            }
          }
          renderInput={(params) => (
            <TextField
              // onInputChange={(event: any, newValue: IOption | null) => {
              //   console.log(newValue);
              // }}
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
