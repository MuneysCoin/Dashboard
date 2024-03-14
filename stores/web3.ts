import { defineStore } from "pinia";

export const useWeb3Store = defineStore("web3Store", {
  state: () => ({
    isConnected: false,
    account: null    
  }),
  actions: {
    connect() {
      const ethereum = window.ethereum;

      if (ethereum) {
        ethereum.request({ method: "eth_requestAccounts" }).then((provider: any) => {
          if (provider) {
            this.account = ethereum.selectedAddress;
            this.isConnected = true;
          }
        });
      }
    }
  }
})