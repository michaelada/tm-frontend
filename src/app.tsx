import 'src/global.css';

// ----------------------------------------------------------------------

import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';
import { SnackbarProvider } from 'notistack';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import { CartProvider } from './sections/cart/context';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
    <AuthProvider>
      <SettingsProvider settings={defaultSettings}>
        <ThemeProvider>
          <MotionLazy>
            <CartProvider>
              <ProgressBar />
              <SettingsDrawer />
              <Router />
            </CartProvider>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  </SnackbarProvider>
  );
}
