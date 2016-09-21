// This script configures the view of the page, hiding the extra paragraphs
// in a project, necessitating a Read More link, which then can toggle additional
// content.
// In addition, it creates filterable content selectors.

// Configure a view object, to hold all our functions for dynamic
// updates and project-related event handlers.

var projectsView = {};

projectsView.handleTabs = function() {
    // Turn the main-nav into tabs, show projects page by default
    $('.main-nav').on('click', 'li', function() {
        var clicked = $(this).attr('data-content');
        $('.tab-content').hide();
        $('.tab-content').filter('#' + clicked).show();
    });
    $('.main-nav .tab:first').click();
};

projectsView.setTeasers = function() {
    // Limit project descriptions to first p unless link is clicked.

    // this nth selector grabs everybody 2 after me
    $('.projectBody *:nth-of-type(n+2)').hide();

    $('#projects').on('click', '.read-more', function(e) {
        e.preventDefault();
        $(this).parent().find('p.projectBody *').show();
    })
};

// Call all of the functions to make them run!
projectsView.handleTabs();
projectsView.setTeasers();