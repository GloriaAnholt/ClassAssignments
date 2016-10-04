// This is where all of the internal redirects go (instead of click listeners)
// to make this into a single-page app. Uses the page library.

page('/', portfolioController.showPortfolio);
page('/about', aboutController.showAbout);
page('/resume', resumeController.showResume);
page('/stats', statsController.showStats);

// Invoke page to run all of the URL - function linking.
page();