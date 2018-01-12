Dear Siteminder,

I am trying to integrate your service for a client and I have encountered several issues I hope you can address.

I am using the embed functionality [documented here](https://docs.google.com/document/d/1oqFMEFaWO4BqCUdSmaDkzuOYZAyDHwF8Mnd6gQkmrJI/edit), the [client property is here](https://app-apac.thebookingbutton.com/properties/manasari12direct?check_in_date=12-01-2018&check_out_date=13-01-2018&number_adults=2).

## High Priority

### Widget UX

When the widget (or direct link) loads the calendar view is automtically displayed which obscures the pricing and description. Is there a way to disable this? If so how? From a user experience point of view my client and I both agree it would be better to see the prices and property details first and allow the person to select their dates before showing the calendar view.

### Intermittent Performance Issues

Sometimes it takes a very long time to load your application, often when refreshing the page. This does not appear to be a network/connectivity issue here as other websites/applications continue to respond normally. Can you explain please?

### Intermittent Page Not Found Error

This is a very strange one. At times the URL (only when embedded in an iframe) will respond with a 404 error (your custom error page) whilst the direct link continues to function as expected. I have been unable to reproduce the problem using `curl` or a normal browser session. Any ideas?

### XML Error

Just got this new error on a refresh and the widget completely fails to load:

> XML Parsing Error: no root element found
> Location: https://app-apac.thebookingbutton.com/api/v2/reloaded/properties/manasari12direct/rate_plans?check_in_date=12-01-2018&check_out_date=13-01-2018
> Line Number 1, Column 1:

## Medium Priority

### Widget Styling

The embed logic simply builds a URL (like the direct link) and writes an `iframe` element with the `?skin=0` query string to embed the property widget. However the choices you have made for the inline styles you apply to the iframe are far from ideal. It may be worth documenting how developers may just specify the iframe itself (really you only need to document `?skin=0` right?) then we don't need to load your javascript and can apply styling to the iframe.

The main styling issue is that we want to stretch the size of the iframe to the height of the content so that we can use the browser scrollbars as opposed to scrollbars for the iframe. Because it is a cross-orgin iframe we cannot script the height of the iframe and would need you to implement this feature. Any ideas how we can stretch the height of the iframe to the height of your widget content? Do you or can you support this feature?

In my opinion this should be the default behaviour as nested scrollbars on a webpage creates a very poor user experience.

## Low Priority

### Loading Icon Glitch

![preloader bug](/bad-preloader-firefox.png)

In Firefox sometimes the font awesome icon you use for the preload does not display correctly (the font has yet to be loaded I imagine). I suggest using an SVG image or alternative solution that fixes this issue.

### Redux Error

You really should fix this. Good for you using react / redux but this sort of thing shouldn't be hitting production code.

> You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build.

### Back Button Broken

Your property pages break the back button with a  `Location` redirect. Please replace with a client-side `document.location.replace()` so as not to interfere with the back button.
