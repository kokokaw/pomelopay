// test-utils.js
import { render } from "@testing-library/react"

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { initialStateMock } from 'tests/mocks'

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)

const customRender = (ui: any, { initialState = initialStateMock, ...options } = {}) => {
	const Providers = ({ children }: any) => {
		const mockStore = configureStore()
	
		const store = mockStore(initialState)
	
		return (
			<Provider store={store}>
				{children}
			</Provider>
		)
	}

	render(ui, { wrapper: Providers, ...options })
}

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render };
