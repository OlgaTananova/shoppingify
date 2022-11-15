import { RenderResult, screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import App from '../../components/App/App';

let documentBody: RenderResult;

describe('Testing NotFound component', () => {
  test('renders the landing page', () => {
    render(<App />);
  });
});
