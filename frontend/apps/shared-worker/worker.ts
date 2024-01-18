// worker.ts
(async () => {
  const connection = new WebSocket("ws://learning-platform.com/ws");
  console.log(connection);
  setInterval(() => {
    console.log("trying to send message");
    connection.send("message");
  }, 2500);

  connection.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });
})();
