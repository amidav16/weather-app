# This project was made for an assigment made by Handelsbanken

# What this project contains:

The assignment felt open to interpretation, my approach was to figure out which API I would utilize, I settled for Open meteo: https://open-meteo.com/
The reason I settled for Open meteo is since their API documentation was easy to understand and get started with.
I also utilized MUI 6 for my UI library, primarily their Dashboard and Card components.

# What would I have done differently?

This assignment was really enjoyable, I didn't feel too content with my choices as I spent alot of time planning out what API and UI library to use. I initially thought of using Meta Weather API and Chakra UI.
I felt a bit lost when attempting to understand Meta Weather API and I have never worked with Chakra UI, and realised learning it too ambitious with little time constraint.
If I had more time I would have for sure improved the looks of the Weather details when you click a card. Maybe a card highlight once you hover over one and a suttle animation that plays once you view the details.
I thought that my approach towards using a Dropdown could have been better. Instead I should have opted for a searchable dropdown.

Make a better Test for the application, since i'm not confident in testing of code (I didn't utilize code test during Dbwatch, not enough experience). I want to be more confident in testing and make a proper test for example an integration test like the API call itself.

More cleaner and more sturctured code.

Theres an issue with sunset and sunrise:
Caveats: The code generator does not handle sunrise and sunset correctly. It is supposed to be ".valuesInt64" instead of ".values". For the ensemble API, multiple members per variable are not correctly decoded. You will have to loop over `variables`.

This would take me a little to debug, I decided to not troubleshoot it this time.

## Setup

Install the dependencies:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
