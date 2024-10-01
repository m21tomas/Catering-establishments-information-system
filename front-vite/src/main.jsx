import ReactDOM from "react-dom/client";
import { Route, BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <StyledEngineProvider injectFirst>
      <Route path="*" component={App} />
    </StyledEngineProvider>
  </BrowserRouter>
);
