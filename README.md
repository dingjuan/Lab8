# Lab8_Starter
Juan Ding  
Pablo Gratas

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   I will test every logic that matters to user like testing the button click events like user create a note, whether we sent it to the back-end.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   No, since we can't control what can a user sent or write to another user like whether the message contains abusing or offensive words that requires sentiment anaylisis which  should not be convered by the unit test.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   Yes. Since if this is our design for the display max length of the message, then we should test, do we have test the logic of handle the length of the every message like if user enter exceed the 80 characters, we can pop up an alert or just not allowed no more character into the text box. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   We can test all the page router - show correct page after users' navigation, like the page url, states, or the behaviors of forward and backwords.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    beforeAll(async () => {
        await page.goto('https://.../settings)
    })

