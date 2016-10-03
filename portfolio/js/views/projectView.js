// This script configures the view of the page, hiding the extra paragraphs
// in a project, necessitating a Read More link, which then can toggle additional
// content.
// In addition, it creates filterable content selectors.

// Configure a view object, to hold allProjects our functions for dynamic
// updates and project-related event handlers.



var projectsView = {};
var filtersView = {};

projectsView.setTeasers = function() {
    // Limit project descriptions to first p unless link is clicked.

    // this nth selector grabs everybody 2 after me
    $('.projectBody p:nth-of-type(n+2)').hide();

    $('#projects').on('click', '.read-more', function(e) {
        e.preventDefault();
        if ( $(this).text() === 'Read More' ) {
            $(this).parent().find('p').show();
            $(this).text('Hide');
        } else {
            $(this).parent().find('.projectBody p:nth-of-type(n+2)').hide();
            $(this).text('Read More');
        }
    })
};


projectsView.handleFilterBehavior = function() {
    // On change in drop down, display posts based on selection
    $('#category-filter').on('change', function() {
        if ( $(this).val() ) {
            var selection = $(this).val();
            $('article').hide();
            $('article').filter('[data-category="' + selection + '"]').fadeIn('slow');
        } else {
            $('article').not('.projectsTemplate').hide().fadeIn('slow');
        }
    });
};

// Here are some stats about the projects
projectsView.initStatsPage = function() {

    var template = Handlebars.compile($('#stats-template').html());

    Projects.statsBuilder().forEach(function(project) {
        $('#stats article').append(template(project));
    })
    $('#stats article').append('<p>The cumulative projects have ' + Projects.totalWordCount() +
        ' total words.</p>');
};


projectsView.renderIndexPage = function() {
    Projects.allProjects.forEach(function(a) {
        $('#projects').append(a.createHtml());
    });
   // projectsView.handleTabs();
    projectsView.setTeasers();
    projectsView.handleFilterBehavior();
    projectsView.initStatsPage();
    Filters.loadAll();
};

filtersView.renderFilters = function() {
    Filters.filtersList.forEach(function(obj) {
        console.log(obj);
        $('#category-filter').append(Filters.createTemplatedFilter(obj));
    })
};

Projects.fetchAll();

