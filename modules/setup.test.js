const Application = require('spectron').Application;
const setup = require('./setup');
const windows = require('./windows');

jest.mock('./windows')
jest.mock('hyperterm-register-shortcut');

let app;

// const focusedWindow = new BrowserWindow().focus();

describe('setup', () => {
  beforeAll(() => {
    app = new Application({
      path :'/Applications/Hyper.app/Contents/MacOS/Hyper'
    });
    app.config = {
      getConfig: jest.fn(() => ({}))
    }
    app.dock = {
      hide: jest.fn()
    }
    console.log('=>', app)
    return app.start();
  });

  afterAll(() => {
    return app.stop();
  });

  describe('blur event handler', () => {
    describe('when no window is focused', () => {
      beforeEach(() => {
        setup(app);
        focusedWindow.emit('browser-window-blur');
      });

      it('hides all windows', () => {
        expect(windows.hideWindows).toHaveBeenCalled();
      });
    });

    describe('when a window is focused', () => {
      beforeEach(() => {
        setup(app, new Set([focusedWindow]));
        focusedWindow.emit('browser-window-blur');
      });

      it('does nothing', () => {
        expect(windows.hideWindows).not.toHaveBeenCalled();
      });
    });
  });

  describe('with default config', () => {
    beforeEach(() => {
      setup(app);
    });

    it('does not hide the dock', () => {
      expect(app.dock.hide).not.toHaveBeenCalled();
    });
  });

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValueOnce({
        summon: {
          hideDock: true
        }
      });
      setup(app);
    });

    it('hides the dock', () => {
      expect(app.dock.hide).toHaveBeenCalled();
    });
  });
});
