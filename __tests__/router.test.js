/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';

 describe('home page ', () => {
    test('push to home page', () => {
         let history = pushToHistory('home')
         expect(history.length).toBe(2);
         expect(history.state["page"]).toBe(undefined);
      });
  });


describe('setting page ', () => {
    test('push to setting page', () => {
         let history = pushToHistory('settings')
         expect(history.length).toBe(3);
         expect(history.state["page"]).toBe("settings");
      });
});

describe('entry page ', () => {
    test('push to entry page', () => {
         let history = pushToHistory('entry', 3)
         expect(history.length).toBe(4);
         expect(history.state["page"]).toBe("entry3");
      });
});