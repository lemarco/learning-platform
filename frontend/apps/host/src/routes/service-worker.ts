import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

// addEventListener("custom", () => {
//   console.log("custom event emited");
// });

// onconnect = (event) => {
//   const port = event.ports[0];

//   // Handling messages from the main script
//   port.onmessage = (event) => {
//     console.log("Shared Worker Received Message:", event.data);

//     // Sending a message back to the main script
//     port.postMessage("Hello from the shared worker!");
//   };

//   // Informing the main script that the connection is established
//   port.postMessage("Connection to shared worker established!");
// };
declare const self: ServiceWorkerGlobalScope;
