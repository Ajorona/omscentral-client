# @omscentral/client

React app behind [omscentral.com](https://omscentral.com).

## Tech

- [create-react-app](https://github.com/facebook/create-react-app)
- [material-ui](https://material-ui.com/)
- [graphql](https://graphql.org/)
- [apollo](https://www.apollographql.com/)
- [firebase](https://firebase.google.com/)

## Getting Started

```
npm install
```

## Environment Variables

Copy `.env.development`:

```
cp .env.development .env.development.local
```

Then, modify `.env.development.local` such that:

```sh
REACT_APP_API_URI="http://localhost:8080/graphql"
```

This requires `PORT=8080` to be specified in the `.env` for `@omscentral/server`.

Next, update the Firebase settings. This first requires creating a new project in the [Firebase console](console.firebase.google.com). Once the project is created, click "Add app" from the "Project Overview" page to add a new "Web" app to the project. Once the app is added, navigate to the "Settings" page, "General" tab, and look for "Firebase SDK snippet" > "Config". Copy the config settings to your `.env.development`.

## OAuth

In order to authenticate with OAUTH providers (Facebook, GitHub, Google, Twitter), additional configuration is required:

- [facebook](https://firebase.google.com/docs/auth/web/facebook-login)
- [github](https://firebase.google.com/docs/auth/web/github-auth)
- [google](https://firebase.google.com/docs/auth/web/google-signin)
- [twitter](https://firebase.google.com/docs/auth/web/twitter-login)

Note that Facebook blocks authentication if `location.protocol !== 'https'`. To force `https://localhost:3000`, add the following to your `.env.development.local`:

```
HTTPS=true
```

## Start

```
npm start
```

Starts server w/hot-reloading.

## Deployment

Deployment is manual via Firebase hosting (for now).

To deploy, first authenticate w/firebase:

```
npm i -g firebase-tools
firebase login
```

Then, make sure your Firebase project is active:

```
firebase use <your_project_name>
```

Finally, build the static assets and deploy them to Firebase hosting:

```
npm run build:staging
firebase deploy --only hosting
```
