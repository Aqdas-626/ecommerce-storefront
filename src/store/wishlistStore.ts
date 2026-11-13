import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  ids: number[];
  toggle: (id: number) => void;
  remove: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) => {
        if (get().ids.includes(id)) {
          set({ ids: get().ids.filter((wishlistId) => wishlistId !== id) });
        } else {
          set({ ids: [...get().ids, id] });
        }
      },

      remove: (id) => {
        set({ ids: get().ids.filter((wishlistId) => wishlistId !== id) });
      },

      isWishlisted: (id) => get().ids.includes(id),

      clear: () => set({ ids: [] }),
    }),
    {
      name: 'shopkart-wishlist',
      partialize: (state) => ({ ids: state.ids }),
    },
  ),
);
