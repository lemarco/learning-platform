/* eslint-disable @typescript-eslint/no-unused-vars */
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// interface BearSlice {
//   bears: number;
//   addBear: () => void;
//   eatFish: () => void;
// }

// interface FishSlice {
//   fishes: number;
//   addFish: () => void;
// }

// interface SharedSlice {
//   addBoth: () => void;
//   getBoth: () => void;
// }

// const createBearSlice: StateCreator<
//   BearSlice & FishSlice,
//   [],
//   [],
//   BearSlice
// > = (set, get) => ({
//   bears: 0,
//   addBear: () => set((state) => ({ bears: state.bears + 1 })),
//   eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
// });

// const createFishSlice: StateCreator<
//   BearSlice & FishSlice,
//   [],
//   [],
//   FishSlice
// > = (set, get) => ({
//   fishes: 0,
//   addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
// });

// const createSharedSlice: StateCreator<
//   BearSlice & FishSlice,
//   [],
//   [],
//   SharedSlice
// > = (set, get) => ({
//   addBoth: () => {
//     // you can reuse previous methods
//     get().addBear();
//     get().addFish();
//     // or do them from scratch
//     // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
//   },
//   getBoth: () => get().bears + get().fishes,
// });

// const useBoundStore = create(
//   persist(
//     (set, get) => ({
//       ...createBearSlice(set, get),
//       ...createFishSlice(set, get),
//       ...createSharedSlice(set, get),
//     }),
//     {
//       name: 'storage', // name of the item in the storage (must be unique)
//     }
//   )
// );
// export function store(set, get) {
//   let ws: WebSocket;

//   const openHandler = () => {};
//   const messageHandler = () => {
//     // Call settters here
//   };
//   const closeHandler = () => {
//     console.log('Closed WS');
//     set({ subscribed: {} });
//     ws = new WebSocket('');

//     ws.addEventListener('open', openHandler);
//     ws.addEventListener('message', messageHandler);
//     ws.addEventListener('close', closeHandler);
//   };
//   closeHandler();

//   return {
//     actions: {
//       dispatch: (args) => set((state) => reducer(state, args, ws, get)),
//     },
//   };
// }
