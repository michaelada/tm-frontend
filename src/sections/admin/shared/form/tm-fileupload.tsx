// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
//
// import { UploadAvatar, Upload, UploadBox } from '../../scoring/elements/upload';

// ----------------------------------------------------------------------
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


type RHFUploadBoxProps = {
  name: string,
  onUpdate: (files: FileList | null) => void
};

export function TmFileUpload({ name, onUpdate, ...other }: RHFUploadBoxProps) {
  const { control } = useFormContext();

  // const getFiles = (event: ChangeEvent<HTMLInputElement>) => (
  //   const fv: FieldValue  = { 'file', event?.target.files};
  //     return [ fv]
  // )

  // const onUpdate = (files: FileList | null) => {

  // }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Button
          variant="outlined"
          color='warning'
          component="label"
        >
          {name}
          <VisuallyHiddenInput            
            type="file"
            onChange={(event) => onUpdate(event.target.files)}
            multiple
          />
        </Button>
      )}
    />
  );
}

