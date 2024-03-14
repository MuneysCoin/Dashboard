export const useAppStore = defineStore('appStore', {
    state: () => ({
      drawer: false
    }),
    actions: {
        toggleDrawer(): void {
            this.drawer = !this.drawer;
        }
    }
  })
