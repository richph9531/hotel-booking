
# hotel-booking assignment

  

**Completed for Equal Experts**

**by Richard Philips (0722129531)**  

Application under test: http://hotel-test.equalexperts.io/

  

## Part 1

> 1. Manually test the hotel booking system, based upon your own testing intuition (no requirements are provided).
> 2. Write a brief summary of the testing you performed, such that another tester could continue your work.

I first opened the site from my **mobile phone** and noticed immediately that it was not built with these viewing dimensions in mind. However, just clicking around and taking a look at some of the other booking entries, I quickly gathered that this is a simple front-end that serves as an entry point for a **microservice** that allows for the **creation and deletion** of basic booking information.
 
Once on a desktop, I opened the site in Chrome with **developer tools** (F12) open. I could see that the creation of a new entry is done via a **POST request**, which takes a payload, including all the information for the booking. This request, if successful, reponds with a status code of 200 and a body that includes a booking id and a confirmation of the data that was posted.

The **DELETE request** simply takes a booking id as a query parameter and goes through some **basic authorisation**. A decoding of the base64 string revealed the **user name and password** needed to call the endpoint from an external application, such as Postman. When successful, a response code of 201 is returned to the front end and the booking is deleted.

Once I understood how the mechanics of the site worked, I was able to focus my exploratory testing on simply trying out different combinations of bookings that I thought should be **successful** and combinations that should **not be allowed**. I noted my findings as either **questions** for the team (where I was unsure of the expected outcome) or as **bugs** for the things that were definitely incorrect. I also put together a couple of **potential enhancements** that I thought could improve the user experience.

##  

**Summary of manual tests performed** (which ended up being the basis for my automation). 

This was done by combination of **front end entry** and **curl commands** within Postman.

Example of a POST curl:

    curl --location --request POST 'http://hotel-test.equalexperts.io/booking/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "firstname": "Book",
      "lastname": "Two",
      "totalprice": "1000",
      "depositpaid": "true",
      "bookingdates": { "checkin": "2022-01-25", "checkout": "2022-01-26" }
    }'

***Name fields***

 - can post a booking with firstName that contains special characters
 - can post a booking with lastName that contains special characters
 - can post a booking with firstName that contains spaces
 - can post a booking with lastName that contains spaces
 - cannot post without a firstName
 - cannot post with a blank firstName
 - cannot post without a lastName
 - cannot post with a blank lastName
 - cannot post with firstName of spaces only **(FAILS)**
 - cannot post with lastName of spaces only **(FAILS)**


***totalPrice field***
 - can post a booking with a totalPrice of zero
 - can post a booking with a totalPrice of 1000,000,000
 - cannot post without a totalPrice
 - cannot post with an invalid totalPrice
 - cannot post with a negative totalPrice **(FAILS)**

***depositPaid boolean***
 - can post a booking with depositPaid = true
 - can post a booking with depositPaid = false
 - cannot post without a depositPaid boolean
 - cannot post with an invalid depositPaid boolean **(FAILS)**

***date fields***
 - cannot post without a booking dates object
 - cannot post without a checkIn date
 - cannot post with an invalid checkIn date
 - cannot post without a checkOut date
 - cannot post with an invalid checkOut date
 - cannot post with a historic checkIn date **(FAILS)**
 - cannot post with a historic checkOut date **(FAILS)**
 - cannot post with a checkOut date before the checkInDate **(FAILS)**

Example of a DELETE curl:

    curl --location --request DELETE 'http://hotel-test.equalexperts.io/booking/62501' \
    --header 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM='

##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

 **Manual test findings**
 
*Bugs:*
 - There is no obvious sort order of the booking results shown on the page.
 - It seems like all capture fields are sent through to the service as strings. The depositpaid should be a boolean and  the totalprice should be numeric.
 - I can enter dates in the past. 
 - There is no validation (front end of back end) that the start date must be before the end date.
 - There doesn't seem to be a character limit to the name fields. 
 - Error messages from the API are generic internal server errors (500).
 - I can enter a name of just blank space.
 - I can enter a negative totalPrice.
 - I can enter an invalid depositpaid boolean.

*Questions:*
 - Shouldn't we also capture some contact details for the bookings?
 - Can the checkin date be the same as the checkout date?
 - Is there a minimum stay duration? What about maximum?
 - Should we be able to capture zero totalPrice (free stays)?
 - Is there a deposit percentage/amount field missing? Or is it a fixed percentage of the totalPrice?
 - How far in the future should we allow bookings?
 - Why is there auth on the delete and not on the post?
 - Why can I view everyone's bookings.

*Suggested improvements:*
 - Improve the mobile view.
 - It would be useful to be able to update bookings that have been captured instead of delete and re-capture.


## Part 2

> Create one or more automated tests to check the creation and deletion of bookings.
> Your automated tests should be written in Java, Scala or a .NET language.
> Please package your tests in a way that allows us to instantly see them running.

I created a suite of tests using a Javascript framework that I am familiar with. I have also worked with Scala and Golang APIs and could, I am sure, learn new frameworks pretty quickly.

**Tools used for this framework:**

 1. Jest (https://www.npmjs.com/package/jest)
 2. Axios (https://www.npmjs.com/package/axios)
 3. Moment (https://www.npmjs.com/package/moment)
 4. Lodash cloneDeep (https://www.npmjs.com/package/lodash)

The test suite runs to completion in around 10 seconds and covers all of the scenarios I listed under the manual tests.

**Steps to run in pipeline:**
1. Trigger a workflow from the actions tab of this Gitlab project.
2. View the workflow steps to see the test output.

**Steps to run locally:**
 1. Clone this repository.
 2. Install NodeJS and npm from here: https://nodejs.org/en/download/
 3. From the command line within the project's root directory, run:
 -     npm install
 -     npm run test
## 

I am more than happy to demo the test suite or to walk you through my thinking and or approach. Please don't hestitate to get in touch.