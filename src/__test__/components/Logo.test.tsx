import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import Logo from '../../components/Logo/Logo';

describe('Testing Logo component', () => {
  beforeAll(() => {
    render(<Logo />);
  });
  test('rendering logo image', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  test('redirecting to the main page by clicking on the logo', () => {
    fireEvent.click(screen.getByAltText('Logo'));
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });
});
