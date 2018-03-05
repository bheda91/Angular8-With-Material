import { MilClubPage } from './app.po';

describe('mil-club App', () => {
  let page: MilClubPage;

  beforeEach(() => {
    page = new MilClubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
