describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
  });

  beforeEach(() => {
    jest.setTimeout(300000);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    let first_entry = await entries[0];
    await first_entry.click();
    await page.waitForNavigation();
    
    expect(page.url()).toContain('/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    const result = await page.evaluate(() => {
      let header =  document.querySelector('header > h1').innerHTML;  
      return header;
    });

    expect(result).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        const result = await page.evaluate(() => {
          return document.querySelector('entry-page').entry;
        });
    
        expect(result.title).toBe('You like jazz?');
        expect(result.date).toBe('4/25/2021');
        expect(result.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
        expect(result.image['src']).toBe("https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455");
        expect(result.image['alt']).toBe("bee with sunglasses");

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
      const result = await page.evaluate(() => {
         return document.body.classList;
      });
      expect(result['0']).toBe("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    jest.setTimeout(100000);
    await page.click('header > img');
    //await page.waitForNavigation();
    expect(page.url()).toContain('/#settings');

  }, 30000);

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const result = await page.evaluate(() => {
      let header =  document.querySelector('header > h1').innerHTML;  
      return header;
    });

    await expect(result).toBe('Settings');

  }, 30000);

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const result = await page.evaluate(() => {
      return document.body.classList;
    });
    expect(result['0']).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toContain('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be the homePage with http://127.0.0.1:5500/', async() => {
    // implement test11: Clicking on the back button should update the URL’
    await page.goBack();
    expect(page.url()).toBe("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries"', async () => {
    const result = await page.evaluate(() => {
      let header =  document.querySelector('header > h1').innerHTML;  
      return header;
    });
    await expect(result).toBe('Journal Entries');

  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: When the user on the homepage, the <body> element should not have any class attribute', async () => {
    const result = await page.evaluate(() => {
      return document.body;
   });
   expect(result.classList).toBe(undefined);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
     // implement test3: Clicking on the second journal entry should update the URL to contain “/#entry2”
     const entries = await page.$$('journal-entry');
     let first_entry = await entries[1];
     await first_entry.click();
     await page.waitForNavigation();
     
     expect(page.url()).toContain('/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Clicking second <journal-entry>, checking page header title should be Entry 2', async () => {
    // implement test15: Clicking on the second journal entry should update the header text to “Entry 2” 
    const result = await page.evaluate(() => {
      let header =  document.querySelector('header > h1').innerHTML;  
      return header;
    });

    expect(result).toBe('Entry 2');
 });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the second journal entry should contain the following contents: 
        { 
          title: 'Run, Forrest! Run!',
          date: '4/26/2021',
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        const result = await page.evaluate(() => {
          return document.querySelector('entry-page').entry;
        });
    
        expect(result.title).toBe('Run, Forrest! Run!');
        expect(result.date).toBe('4/26/2021');
        expect(result.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
        expect(result.image['src']).toBe("https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg");
        expect(result.image['alt']).toBe("forrest running");

  }, 100000);

  // create your own test 17
    // define and implement test11: Clicking the back button once should bring the user back to the home page
    it('Test17: Clicking the back button, new URL should be the homePage with http://127.0.0.1:5500/', async() => {
      // implement test11: Clicking on the back button should update the URL’
      await page.goBack();
      expect(page.url()).toBe("http://127.0.0.1:5500/");
    });

  // create your own test 18
   // define and implement test18: Verify the title is current when clicking on the fourth entry
   it('Test18: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the fourth journal entry should update the URL to contain “/#entry4”
    const entries = await page.$$('journal-entry');
    let first_entry = await entries[3];
    await first_entry.click();
    await page.waitForNavigation();
    
    expect(page.url()).toContain('/#entry4');
  },30000);

  // create your own test 19
  // define and implement test19: Verify the title is current when clicking on the fourth entry
  it('Test19: Clicking second <journal-entry>, checking page header title should be Entry 2', async () => {
    // implement test15: Clicking on the second journal entry should update the header text to “Entry 2” 
    const result = await page.evaluate(() => {
      let header =  document.querySelector('header > h1').innerHTML;  
      return header;
    });

    expect(result).toBe('Entry 4');
 }, 30000);

  // create your own test 20
   // define and implement test20: Verify the entry page contents should include audio src when clicking on the fourth entry
   it('Test20: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test20: Clicking on the fourth journal entry should contain the audio content: 
        { 
          "audio":"https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk"}
        }
      */
        const result = await page.evaluate(() => {
          return document.querySelector('entry-page').entry;
        });
    
        expect(result.title).toBe("You're a wizard, Harry");
        expect(result.audio).toBe('https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk');

  }, 100000);
  
});