import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ToggleColorMode from "./utils/ToggleColorMode";
import store from "./app/store";
import ScrollToTop from "./ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<ToggleColorMode>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</ToggleColorMode>
	</Provider>
);
