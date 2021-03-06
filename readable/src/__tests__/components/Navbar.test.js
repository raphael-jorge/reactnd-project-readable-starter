import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import routes from '../../routes';
import Navbar from '../../components/Navbar';

// Utils
const setup = (propOverrides) => {
  const props = Object.assign({
    categories: [],
    activeCategoryPath: undefined,
  }, propOverrides);

  const header = shallow(
    <MemoryRouter>
      <Navbar {...props} />
    </MemoryRouter>
  ).find(Navbar).dive();

  return {
    props,
    header,
  };
};


// Tests
describe('<Navbar />', () => {
  it('renders a link to the root page', () => {
    const { header } = setup();
    const links = header.find('Link');
    const rootLink = links.findWhere((link) => link.prop('to') === routes.root);
    expect(rootLink.length).toBe(1);
  });


  it('renders a NavLink to the root page', () => {
    const { header } = setup();
    const navLink = header.find('NavLink');

    expect(navLink.length).toBe(1);
    expect(navLink.prop('to')).toBe(routes.root);
    expect(navLink.prop('activeClassName')).toBe('active');
  });


  it('renders a NavLink to each category page for each category on categories', () => {
    const categories = global.testUtils.getDefaultCategoriesArray();
    const { header } = setup({ categories });

    const renderedCategories = header.find('.category-item');

    categories.forEach((testCategory) => {
      const matchingRenderedCategory = renderedCategories.filterWhere((category) => {
        return category.key() === testCategory.name;
      });

      const childrenLink = matchingRenderedCategory.find('NavLink');

      expect(matchingRenderedCategory.length).toBe(1);
      expect(childrenLink.length).toBe(1);
      expect(childrenLink.prop('to')).toBe(`/${testCategory.path}`);
      expect(childrenLink.prop('activeClassName')).toBe('active');
    });
  });
});
