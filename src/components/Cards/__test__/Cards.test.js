import { render as renderRtl, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Cards } from "..";
import cats from '../../../mocks/cats.json';
import { setCats, store } from "../../../store";


const render = component => renderRtl(<Provider store={store}>{component}</Provider>);

store.dispatch(setCats(cats));

describe('Cards', () => {
  test('should render five card components', () => {
    render(<Cards cats={cats} />);
    expect(screen.getAllByRole('article').length).toBe(cats.length);
  })
});