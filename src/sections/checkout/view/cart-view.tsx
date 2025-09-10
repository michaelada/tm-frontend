import { useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { IDeliveryAddress } from 'src/utils/types/user.interface';

import { formatAddress } from 'src/routes/utils';
import { useCartContext } from '../../cart/context';
import { CheckoutCart } from '../checkout-cart';
import { CheckoutOrderComplete } from '../checkout-order-complete';
import { paths } from '../../../routes/paths';
import axios, { endpoints } from '../../../utils/axios';
import { CheckoutDelivery } from '../checkout-delivery';
import { CheckoutSteps } from '../checkout-steps';
import { CheckoutConfirmOrder } from '../checkout-confirm-order';


// ----------------------------------------------------------------------
type IAddress = {
  label: string;
  value: number;
  description: string;
};
const defaultAddress: IDeliveryAddress = {
  address: '', address1: '', address2: '', address3: '', address4: '', city: '', county: ''
};

export function CartView() {
  const cart = useCartContext();
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [billingAddress, setBillingAddress] = useState<IDeliveryAddress>(defaultAddress);
  const [error, setError] = useState('');
  
  const checkout = () => {
     cart.onSetDeliveryAddress(0,'');
    setStep(1);
  }
  
  const finished = () => {
     setStep(0);
     cart.onReset();
    router.push(paths.product.root);
  }

  const onApplyShipping = (selected:number) => {
    const address = addresses.find(a => a.value === selected);
    if(address) {
        cart.onSetDeliveryAddress(address.value, address.description)
    } else {
       cart.onSetDeliveryAddress(0,'');
    }
    
  }

  
    useEffect(() => {
      getDeliveryOptions();
    }, []);
  
    const onBack = () => {
      setStep(step-1);
    }

    
  const getDeliveryOptions = () => {
        setError('');
        axios.get(endpoints.address.list)
          .then(response => {
            setAddresses(response.data.addresses.map((a: any, index: number) => ({
              label: a.address,
              value: a.delivery_id,
              description: a.address
            })));        
            setBillingAddress(response.data.billingAddress);
          })
          .catch(err => {
            setError(`Problem fetching data: ${err}`);
          });    
  }

  const onConfirm = () => {
     setError('');
        axios.post(endpoints.cart.checkout(cart.orderReference, cart.deliveryId, ''))
          .then(response => {
              cart.onReset();
              setStep(3)
          })
          .catch(err => {
            setError(`Problem submitting order: ${err}`);
          });    
  }

  const getDeliveryAddress = () => {
    if(cart.deliveryId === 0) {
      return formatAddress(billingAddress);
    }
    return cart.deliveryAddress;
  }

  const onContinue = () => {
    // if(!cart.deliveryId) {
    //   return;
    // }
    setStep(step+1);
  }

  
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Checkout
      </Typography>

      <>
      {step > 0 && <CheckoutSteps activeStep={step-1} steps={['Provide Delivery Address', 'Confirm Order', 'Completed']}/>}
      {step === 0 && <CheckoutCart onCheckout={checkout}/>} 

        {step === 1 && (
            <CheckoutDelivery selectedValue={cart.deliveryId} options={addresses} onApplyShipping={onApplyShipping} billingAddress={billingAddress} onAdd={(newAddress) => {}}/> 
        )}
        {step === 2 && (
            <CheckoutConfirmOrder onConfirm={onConfirm} deliveryAddress={getDeliveryAddress()}/> 
        )}
        {step === 3 && (
            <CheckoutOrderComplete open onDownloadPDF={() => { } } onReset={() => finished()} /> 
        )}
      </>
      <Box sx={{mt:3, display: 'flex', justifyContent: 'space-between'}} >
      {step > 0 &&  <Button
            color="primary"
            variant="outlined"
            onClick={onBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>}
      {step > 0 && step < 2 && <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onContinue()}
                  endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                  // disabled={!cart.deliveryId}
                  // display="flex"
                  // alignItems="center"
                  // justifyContent="space-between"
                >
                  Continue
                </Button>
                }
                </Box>
    </DashboardContent>
  );
}

