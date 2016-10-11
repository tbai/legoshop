import { LegoshopPage } from './app.po';

describe('legoshop App', function() {
  let page: LegoshopPage;

  beforeEach(() => {
    page = new LegoshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
