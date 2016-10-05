/* This controls selecting the category filter information and creating the
Handlebars templating to display to page (on the View)  */


function Filters() {}
Filters.filtersList = [];

Filters.createTemplatedFilter = function(obj) {
    globalCallOrder.push('Prototype createTemplatedFilter called');
    var $sourceHtml = $('#filters-template').html();
    var template = Handlebars.compile($sourceHtml);

    return template(obj);
};

Filters.loadAll = function() {
    globalCallOrder.push('Filters.loadAll called');
    // In the loop, grab out the filter and make it into an object for Handlebars
    if (localStorage.cachedFilters) {
        Filters.filtersList = JSON.parse(localStorage.getItem('cachedFilters'));
        filtersView.renderFilters();
    } else {
        Filters.filtersList = Projects.allProjects.map(function(cur, i, array) {
            // use map to return an object built out of the parts I want
            // couldn't get the two templates to play nice, leaving this for now
            return { category: cur.category, pubDate: cur.pubDate };
        });
        localStorage.setItem('cachedFilters', JSON.stringify(Filters.filtersList));
        filtersView.renderFilters();
    }
};  // close loadAll
