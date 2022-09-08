import { AppPage } from './app.po';

describe('planning App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Bienvenido', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Planning');
  });
});
