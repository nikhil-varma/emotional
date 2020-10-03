This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Known issues

- If the user list for a reaction is a lot, the scrolling affects the whole popover content and does not keep the reaction tab header static
- Needs better error handling but could not implement it due to lack of time (8 hours cap)
- The performance of the architecture can be improved by cutting out the following few aspects
  - Remove redundant popover logic
  - Remove unnecessary loops to compare and filter `content_reactions` with `users`. Although this will work on limited scope so it’s not a massive loss
- The emoji hovers aren’t completely smooth due to the browser calculation the padding and font-size and probably trying to adjust the position (Speculation as of now. Will need confirmation)
- The design system can definitely be improved.
- Some architectural decisions were made to avoid multiple server calls. For ex:
  - The post and get calls are made inside App.js and then the data is posted down to the child components. This will be effective for one major scenario, consider if we were to shoot requests on reaction tab clicks in the <SummaryView /> to get updated data after someone reacts to a content, it could have proven costly since we could not avoid those unnecessary calls. Rather the design allows to shoot a post call and then immediately get it via the server to ensure that for each post there is only one request made and the data loads immediately in the summary view without any delays giving good UX
- Few more micro-optimisation can be made in order to improve performance
- When an API call is under progress to post, both the buttons show loading. This is because it is using the same `isLoading` variable.

### Deployed URL:

To view the site click the link below
[Click here to view app](https://festive-allen-5a28d7.netlify.app/)
