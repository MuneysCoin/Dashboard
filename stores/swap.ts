import type { IToken } from "~/models/token.model";

export const useSwapStore = defineStore('swapStore', {
  persist: true,
  state: () => ({
    allowanceToken: {} as IToken,
    loading: false
  }),
  actions: {
    setAllowance(token: IToken): void {
      if (token.allowance) {
        this.allowanceToken = token;
      }
    }
  }
})
