import { LOFOPage } from './app.po';

describe('lofo App', function() {
  let page: LOFOPage;

  beforeEach(() => {
    page = new LOFOPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
