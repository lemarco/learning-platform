import { $, Slot, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { RequestHandler, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import RemoteMfe, { AppState, GlobalAppState } from "../../components/remote-mfe";
export default component$(() => {

    return (<>
     <RemoteMfe
      remote={{
        name: "header",
        url: "http://localhost:10001/",
        _url: "http://localhost:10001/",
        secondsOfDelay: 0}} />
 
 <Slot/>

     <RemoteMfe
      remote={{
        name: "footer",
        url: "http://localhost:10001/",
        _url: "http://localhost:10001/",
        secondsOfDelay: 0,

      }}
    />
    </>)
  });