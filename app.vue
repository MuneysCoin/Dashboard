<template>
  <Head>
    <Title>Muneys App BETA</Title>
    
    <!-- Google tag (gtag.js) -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-S9TMPKJ9HV"
    />
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-S9TMPKJ9HV');
    </script>
    <!-- Hotjar Tracking Code for Muneys App -->
    <script>
      (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:3908560,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>
  </Head>
  <NuxtLayout>
    <NuxtPage /> 
  </NuxtLayout>
</template>

<script setup lang="ts">
import { createWeb3Modal } from '@web3modal/wagmi'
import { reconnect } from '@wagmi/core'
import { config, projectId } from '~/configs/wagmi.config'

reconnect(config)

const tokens: any = {
  1: {
    address: "0x74c57783b980a44efa4741ba863a71aded83f71c",
    image: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png"
  },
  2: {
    address: "0xe93365962fF59a26892CE3521eE3823Fa707Bc9C",
    image: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png"
  }
}


// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default,
  themeMode: 'dark',
  tokens
})
</script>
