import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wellmax.walletv1',
  appName: 'Wellmax Wallet',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
