import { BookingAppClientPage } from './app.po';

describe('booking-app-client App', () => {
  let page: BookingAppClientPage;

  beforeEach(() => {
    page = new BookingAppClientPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
