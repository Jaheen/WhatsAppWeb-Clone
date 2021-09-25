import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import IndexPage from "pages/IndexPage"
import AppPage from "pages/AppPage"
import { Provider } from "react-redux"
import store from "redux-store"
import "./global.css"

class ProtectedRoute extends Route {
	render() {
		if(window.localStorage.getItem("server-auth-token"))
			return this.props.routeComponent
		else
			return <Redirect to="/" />
	}
}

class AuthRoute extends Route {
	render() {
		if(window.localStorage.getItem("server-auth-token"))
			return <Redirect to="/app" />
		else
			return this.props.routeComponent
	}
}

/**
 * Top level container that contains entire application
 */
export default function App() {
	return (
		<Provider store={store}>
			<section className="App">
				{/* Top level router */}
				<BrowserRouter>
					<Switch>
						<AuthRoute path="/" exact routeComponent={<IndexPage />} />
						<ProtectedRoute path="/app" routeComponent={<AppPage />} />
					</Switch>
				</BrowserRouter>
			</section>
		</Provider>
	)
}