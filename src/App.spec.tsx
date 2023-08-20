import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

// To Test
import App from '~/App'

// Tests
test('Renders main page correctly', async () => {
  // Setup
  render(<App />)
  const buttonCount = await screen.findByRole('button')
  const codeCount = await screen.queryByText(/The count is now:/)

  // Pre Expectations
  expect(buttonCount.innerHTML).toBe('count is: 0')
  expect(codeCount).not.toBeInTheDocument()

  // Init
  await user.click(buttonCount)
  await user.click(buttonCount)
  await user.click(buttonCount)

  // Post Expectations
  expect(buttonCount.innerHTML).toBe('count is: 3')
  expect(await screen.queryByText(/The count is now:/)).toBeInTheDocument()
})
