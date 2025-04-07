import { create } from 'zustand';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbStore {
  items: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  removeBreadcrumb: (path: string) => void;
  clearBreadcrumbs: () => void;
}

const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  items: [{ label: 'Бош сахифа', path: '/' }],

  setBreadcrumb: (items) => set({ items }),

  addBreadcrumb: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeBreadcrumb: (path) =>
    set((state) => ({
      items: state.items.filter((item) => item.path !== path),
    })),

  clearBreadcrumbs: () =>
    set({
      items: [{ label: 'Бош сахифа', path: '/' }],
    }),
}));

export default useBreadcrumbStore;
