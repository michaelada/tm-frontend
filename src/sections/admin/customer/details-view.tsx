import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { CardContent } from '@mui/material';

import { adminpaths as paths } from 'src/routes/adminpaths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ICustomer } from '../../../utils/types';
import { CustomerContactDetails } from './customer-contact-details';
import { UserTable } from './user-table';
import { DeliveryAddressTable } from './delivery-address-table';

// ----------------------------------------------------------------------

type Props = {
  customer?: ICustomer;
  error?: any;
  loading?: boolean;
};

export function CustomerDetailsView({ customer, error, loading }: Props) {
  const tabs = useTabs('contact');

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        {/* <ProductDetailsSkeleton /> */}
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 10 }}>
        <EmptyContent
          filled
          title="Customer not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.category.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3, mb: 10 }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Customers', href: paths.dashboard.customer.root },
          { name: customer?.name },
        ]}
        sx={{ mb: 3 }}
      />

      <Card>
        <CardContent>
          <Tabs
            value={tabs.value}
            onChange={tabs.onChange}
            sx={{
              px: 3,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {[
              { value: 'contact', label: 'Contact/ Billing' },
              { value: 'users', label: `User Logins (${customer?.users?.length})` },
              { value: 'delivery', label: `Delivery Addresses (${customer?.deliveryAddresses?.length})` },
            ].map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {tabs.value === 'contact' && (
            <CustomerContactDetails customer={customer} />
          )}
          {tabs.value === 'users' && (
          <UserTable users={customer?.users} />
        )}
        {tabs.value === 'delivery' && (
          <DeliveryAddressTable addresses={customer?.deliveryAddresses} />
        )}
        </CardContent>
      </Card>
    </Container>
  );
}
