import { $, Slot, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { RequestHandler, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import RemoteMfe, { AppState, GlobalAppState } from "../../components/remote-mfe";


export default component$(() => {
  return (
    <>
      <RemoteMfe
        remote={{
          name: "header",
          url: `http://${process.env.FRONTEND_HEADER_APP_HOST}:${process.env.FRONTEND_HEADER_APP_PORT}/`,
          _url: `http://${process.env.FRONTEND_HEADER_APP_HOST}:${process.env.FRONTEND_HEADER_APP_PORT}/`,
          secondsOfDelay: 0,
        }}
      />

      <Slot />

      <RemoteMfe
        remote={{
          name: "footer",
          url: `http://${process.env.FRONTEND_FOOTER_APP_HOST}:${process.env.FRONTEND_FOOTER_APP_PORT}/`,
          _url: `http://${process.env.FRONTEND_FOOTER_APP_HOST}:${process.env.FRONTEND_FOOTER_APP_PORT}/`,
          secondsOfDelay: 0,
        }}
      />
    </>
  );
});
