import { Elysia } from "elysia";

await Bun.build({
  entrypoints: ["./worker.ts"],
  outdir: "./out",
  // minify: true,
});
console.log("AFTER BUILD");
const port = Bun.env.PUBLIC_SHARED_WORKER_PORT;
const host = Bun.env.PUBLIC_SHARED_WORKER_HOST_NAME;
console.log("Bun.env= ", Bun.env);
console.log("process.env.SHARED_WORKER_PORT= ", process.env.PUBLIC_SHARED_WORKER_PORT);
console.log("port =", port);
console.log("host =", host);
// if (!port) {
//   console.log("port =", port);
//   process.exit();
// }
new Elysia().get("/worker.js", () => Bun.file("out/worker.js")).listen({ port, hostname: "0.0.0.0" });
