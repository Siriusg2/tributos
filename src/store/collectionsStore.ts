import { create } from 'zustand';

interface CollectionsStore {}
const useCollectionsStore = create<CollectionsStore>(() => ({}));

export default useCollectionsStore;
