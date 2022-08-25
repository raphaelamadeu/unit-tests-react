import { render as rtlRender, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { Provider } from "react-redux";
import { Pets } from "..";
import cats from '../../../mocks/cats.json';
import { setCats, store } from "../../../store";

const server = setupServer(
  rest.get('http://localhost:4000/cats', 
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(cats)
    )
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close())

const render = (component) => rtlRender(<Provider store={store}>
  {component}
</Provider>)

store.dispatch(setCats(cats));

describe('Pets', () => {
  test("should render the correct amount of cards", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(cats.length);
  })
  
  test('should filter for male cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male');
    const maleCards = await screen.findAllByRole('article');
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  })

  test('should filter for female cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'female');
    const femaleCats = await screen.findAllByRole('article');
    expect(femaleCats).toStrictEqual([cards[0], cards[2], cards[4]]);
  })

  test('should filter by favorite', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const firstCardBtn = within(cards[0]).getByRole('button');

    userEvent.click(firstCardBtn);
    userEvent.selectOptions(screen.getByLabelText(/favorite/i), 'true');
    expect(screen.getByRole('article')).toStrictEqual(cards[0]);
  });

  test('should filter by not favorite', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const firstCardBtn = within(cards[0]).getByRole('button');
    userEvent.click(firstCardBtn);
    userEvent.selectOptions(screen.getByLabelText(/favorite/i), 'false');
    expect(screen.getAllByRole('article').length).toBe(cats.length - 1)
  });

  test('should filter by both filters', () => {
    
  })
})