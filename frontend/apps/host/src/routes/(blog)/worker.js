// let peer = null;

// onconnect = (ev) => {
//   const port = ev.ports[0];
//   port.onmessage = (e) => {
//     if (e.data.type === "start" && e.data.port) {
//       peer = e.data.port;
//     } else if (e.data.type === "msg" && peer) {
//       setInterval(() => {
//         peer.postMessage({ type: "msg", msg: "greetings!" });
//       }, 2000);
//     }
//   };
//   port.start();
// };
self.addEventListener("custom", function handler(e) {
  port.start();
  port.addEventListener("custom", () => {
    console.log("CUSTOM WORKER");
  });
});
