import { PoshakhPage } from './app.po';

describe('poshakh App', function() {
  let page: PoshakhPage;

  beforeEach(() => {
    page = new PoshakhPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
