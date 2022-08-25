import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "..";

const props = {
  label: 'Favorite',
  options: [
    {
      label: 'Any',
      value: 'any',
    },
    {
      label:  'Favorite',
      value: 'favorite'
    },
    {
      label: 'Not favorite',
      value: 'not favorite'
    }
  ]
}

describe('Filter', () => {
  test('should be able to change value of favorite select', () => {
    render(<Filter {...props} />);
    const select = screen.getByLabelText(/favorite/i);
    expect(select.value).toBe('any');
    userEvent.selectOptions(select, 'favorite');
    expect(select.value).toBe('favorite');
    userEvent.selectOptions(select, 'not favorite');
    expect(select.value).toBe('not favorite');
  })
});