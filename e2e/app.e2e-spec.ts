import { CvPlusPage } from './app.po';

describe('cv-plus App', function() {
  let page: CvPlusPage;

  beforeEach(() => {
    page = new CvPlusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
