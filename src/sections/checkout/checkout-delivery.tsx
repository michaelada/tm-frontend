import type { CardProps } from '@mui/material/Card';
import type { IDeliveryAddress } from 'src/utils/types';
import type { ICheckoutDeliveryOption } from 'src/types/checkout';

import { useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import { CheckoutUseBillingAddress } from './checkout-use-billing-address';
import { CheckoutSelectDeliveryAddress } from './checkout-select-delivery-address';

// ----------------------------------------------------------------------

type Props = CardProps & {
  options: ICheckoutDeliveryOption[];
  onApplyShipping: (shipping: number) => void;
  onAdd: (address: IDeliveryAddress) => void;
  selectedValue: number;
  billingAddress: IDeliveryAddress;
};

export function CheckoutDelivery({ options, onApplyShipping, onAdd, billingAddress, selectedValue, sx, ...other }: Props) {
  const [tab, setTab] = useState('2');

  const handleTabSelected = (event: any, newValue: string) => {
    setTab(newValue)
  };

  const renderSelectAddress = () => (
    <CheckoutSelectDeliveryAddress options={options} onApplyShipping={onApplyShipping} selectedValue={selectedValue} />
  )

  const renderUseBillingAddress = () => (
    <CheckoutUseBillingAddress address={billingAddress} hasAlternatives={options && options.length > 0} />
  )

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleTabSelected}
        sx={{
          px: 2,
          bgcolor: 'background.neutral',
        }}
      >
        <Tab
          key="tab-2"
          value="2"
          label="Deliver To Your Billing Address"
        />
        {options && options.length > 0 && <Tab
          key="tab-1"
          value="1"
          label="Select Alternative Delivery Address"
        />}

      </Tabs>
      {tab === '1' && renderSelectAddress()}
      {tab === '2' && renderUseBillingAddress()}
    </>
  );
}


