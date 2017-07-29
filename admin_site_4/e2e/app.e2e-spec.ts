import { PoshakhPage } from './app.po';

describe('poshakh App', () => {
  let page: PoshakhPage;

  beforeEach(() => {
    page = new PoshakhPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
