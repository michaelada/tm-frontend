import type { ICustomer } from 'src/utils/types';

import { Box, Stack, Divider } from '@mui/material';

import Field from '../../shared/field';

// ----------------------------------------------------------------------

type Props = {
  customer?: ICustomer;
};

export function CustomerContactDetails({ customer }: Props) {
  return (
          <Box sx={{p:2}}><Stack direction="column" spacing={0} >
            <Field name="EMail" value={customer?.email} horizontal/>
            <Field name="Account Code" value={customer?.accountCode} horizontal/>
            <Divider sx={{my:2}}/>
            <Field name="Billing EMail" value={customer?.billingEmail} horizontal/>
            <Field name="Billing Phone Contact" value={customer?.billingPhone} horizontal/>
            <Field name="Billing Company" value={customer?.billingCompany} horizontal/>
            {customer?.billingAddress1 && <Field name="Billing Address 1" value={customer?.billingAddress1} horizontal/>}
            {customer?.billingAddress2 && <Field name="Billing Address 2" value={customer?.billingAddress2} horizontal/>}
            {customer?.billingAddress3 && <Field name="Billing Address 3" value={customer?.billingAddress3} horizontal/>}
            {customer?.billingAddress4 && <Field name="Billing Address 4" value={customer?.billingAddress4} horizontal/>}
            {customer?.billingCity && <Field name="Billing Post Code" value={customer?.billingCity} horizontal/>}
            {customer?.billingPostcode && <Field name="Billing Post Code" value={customer?.billingPostcode} horizontal/>}
          </Stack>
          </Box>
  );
}
