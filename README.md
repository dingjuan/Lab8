# Lab8_Starter
Juan Ding  
Pablo Gratas

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   1. Within a Github action that runs whenever code is pushed. We always want to run our automated tests on all code we push to the repository. Doing so locally seems unecessary and isn't automatic, and running them after development leaves holes for mistakes to fit. 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   No, since the idea of "testing a message" is far too broad for a unit test. It's not so much a specific function as it is a whole set of functions and features. E2E is more appropriate here.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   Yes. Since this is a specific function with clearly defined rules, it is easy to test this using the unit test system.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   The tests would run without the UI, and we wouldn't be able to interact in the way we could with a UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    beforeAll(async () => {
        await page.click('header > img');
    })

