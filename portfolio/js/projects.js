// This app reads project data from the projectList.js file and populates the
// index.html page using Handlebars.


var filtersArray = [];

function Projects (data) {
    for (var key in data)
        this[key] = data[key];
}

// Instead of using a global array, add the array to the class (not instances!)
Projects.all = [];

Projects.prototype.createHtml = function() {
    // This function grabs the template section of the page as a jQuery object,
    // and uses Handlebars to populates its values with the details from a
    // the projectList array

    var $sourceHtml = $('#projects-template').html();
    var template = Handlebars.compile($sourceHtml);
    this.pubDate = this.pubDate ?
        'Published on: ' + this.pubDate + ", about " +
        Math.floor(parseInt(new Date() - new Date(this.pubDate))/3600/24/1000) +
        ' days ago.' : '(draft)';
    var newHtml = template(this);

    return newHtml;
};

function createFilters(obj) {
    var $sourceHtml = $('#filters-template').html();
    var template = Handlebars.compile($sourceHtml);
    var newHtml = template(obj);

    return newHtml;
}

Projects.loadAll = function(data) {
    data.sort(function (cur, next) {
        /* subtract next from current and return to the sort function,
        Sort by date: (new Date(next.pubDate)) - (new Date(cur.pubDate))
        Sort by ranking: */
        return (cur.ranking - next.ranking)
    });
    data.forEach(function (element) {
        /* For each elem in project array, call constructor to make a new
        object, update attributes, push to Project array */
        Projects.all.push(new Projects(element));

        // In the loop, grab out the filter and make it into an object for Handlebars
        var newObj = {};
        newObj['category'] = element.category;
        filtersArray.push(createFilters(newObj));
    });
};


Projects.fetchAll = function() {
    $.ajax({
        method: 'GET',
        url: '../data/projectList.json',
        timeout: 2000,
        beforeSend: function() {
            $('#projects-body').append('<div id="load">Loading</div>');
        },
        complete: function () {
            $('#load').fadeOut().remove();
        },
        success: function(data) {
            Projects.loadAll(data);
            projectsView.renderIndexPage();
        },
        error: function(jqXHR, ajaxSettings, thrownError) {
            $('#projects-body').append('<br id="error">Server returned a ' +
                '<b>' + jqXHR.status + ' ' + thrownError + '</b>' +
                ' error message. <br />Please try again later.</div>');
        }
    })
};


filtersArray.forEach(function(a) {
    $('#category-filter').append(a);
});
