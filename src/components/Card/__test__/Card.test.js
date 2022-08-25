import { act, render as rtlRender, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { Card } from "..";
import { setCats, store } from "../../../store";
import cats from '../../../mocks/cats.json';

store.dispatch(setCats([cats[0]]));

const props = cats[0];

const render = component => rtlRender(<Provider store={store}>{component}</Provider>)

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

describe('Card', () => {
  test('should show the name', () => {
    render(<Card {...props} />);
    expect(screen.getByRole('heading', {
      name: props.name
    })).toBeInTheDocument();
  });

  test('should show the e-mail', () => {
    render(<Card {...props} />);
    expect(screen.getByText(props.email)).toBeInTheDocument();
  });

  test('should show the phone', () => {
    render(<Card {...props} />);
    expect(screen.getByText(props.phone)).toBeInTheDocument();
  });

  test('should render image with the right src and alt', () => {
    render(<Card {...props} />);
    expect(screen.getByAltText(props.image.alt).src).toBe(props.image.url);
    expect(screen.getByAltText(props.image.alt).alt).toBe(props.image.alt);
  })

  test('should render outline heart', () => {
    render(<Card {...props} />);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test('should render filled heart', () => {
    render(<Card {...props} favored={true} />);
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  })

  test('should be able to toggle favoured', async () => {
    render(<Card {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(mockDispatch).toHaveBeenCalled();
  })
});