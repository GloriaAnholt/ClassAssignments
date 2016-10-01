// This app reads project data from the projectList.js file and populates the
// index.html page using Handlebars.

var globalCallOrder = [];



function Projects (data) {
    // Constructor function for Projects, uses JSON data to make objects
    globalCallOrder.push('Projects called');
    for (var key in data)
        this[key] = data[key];
}

Projects.prototype.createHtml = function() {
    globalCallOrder.push('Projects.prototype.createHtml called');
    // This function grabs the template section of the page as a jQuery object,
    // and uses Handlebars to populates its values with the details from a
    // the projectList array

    var $sourceHtml = $('#projects-template').html();
    var template = Handlebars.compile($sourceHtml);
    this.pubDate = this.pubDate ?
    'Published on: ' + this.pubDate + ", about " +
    Math.floor(parseInt(new Date() - new Date(this.pubDate))/3600/24/1000) +
    ' days ago.' : '(draft)';

    return template(this);
};

// Instead of using a global array, add the array to the class (not instances!)
Projects.allProjects = [];

Projects.fetchAll = function() {
    // This is the entry point - fetch all is the only method invoked.
    // Checks for local storage, if available and up to date, loads it, otherwise
    // calls the method to update data
    globalCallOrder.push('fetchAll called');
    if (localStorage.cachedProjects) {
        // How to get the headers only and check vs local
        $.ajax({
            method: 'HEAD',
            url: '../data/projectList.json',
            success: function(data, status, xhr) {
                var eTag = xhr.getResponseHeader('eTag');
                if (!localStorage.eTag || eTag != localStorage.eTag) {
                    localStorage.eTag = eTag;
                    // ajax call for json
                    Projects.getUpdatedProjects();
                } else {
                    Projects.loadAll(JSON.parse(localStorage.cachedProjects));
                    projectsView.renderIndexPage()
                }
            }  // close success
        }); // close ajax
    } else {
        Projects.getUpdatedProjects();
    }
};

Projects.getUpdatedProjects = function() {
    // If there's no session data, or it's out of date, fetches all of the data
    // and then calls load and render.
    globalCallOrder.push('getUpdatedProjects called');
    $.ajax({
        method: 'GET',
        url: '../data/projectList.json',
        timeout: 2000,
        beforeSend: function () {
            $('#projects-body').append('<div id="load">Loading</div>');
        },
        success: function (data, status, xhr) {
            // you don't need allProjects three, but if you don't name them you can't use them
            $('#load').fadeOut().remove();
            localStorage.setItem('cachedProjects', JSON.stringify(data));
            Projects.loadAll(data);
            projectsView.renderIndexPage()
        },
        error: function (jqXHR, ajaxSettings, thrownError) {
            $('#load').fadeOut().remove();
            $('#projects-body').append('<br id="error">Server returned a ' +
                '<b>' + jqXHR.status + ' ' + thrownError + '</b>' +
                ' error message. <br />Please try again later.</div>');
            projectsView.renderIndexPage()
        }
    })
};

Projects.loadAll = function(data) {
    // Takes all of the data and sorts it, then calls the constructor and
    // pushes into the allProjects class storage
    globalCallOrder.push('Projects.loadAll called');
    var newdata = data.sort(function (cur, next) { return (cur.ranking - next.ranking) });
    Projects.allProjects = data.sort(function (cur, next) {
        /* subtract next from current and return to the sort function,
         Sort by date: (new Date(next.pubDate)) - (new Date(cur.pubDate))
         Sort by ranking: */
        return (cur.ranking - next.ranking)
    }).map(function (element) {
        /* For each elem in the JSON data, use map to call constructor and update
         the Projects.allProjects array */
        return new Projects(element);
    });
};


Projects.statsBuilder = function() {
    /* Builds an object for handlebars to display */
    return Projects.allProjects.map(function(project) {
        return {
            title: project.title,
            wordCount: project.body.match(/\w+/g).length
        }
    });
};

Projects.totalWordCount = function() {
    return Projects.statsBuilder().map(function(project) {
        return project.wordCount;
    }).reduce(function(prev, cur) {
        return prev + cur;
    })
};



function Filters(data) {
    globalCallOrder.push('Filters called');
    for (var key in data)
        this[key] = data[key];
}

Filters.allFilters = [];

Filters.prototype.createFilters = function() {
    globalCallOrder.push('Prototype createFilters called');
    var $sourceHtml = $('#filters-template').html();
    var template = Handlebars.compile($sourceHtml);

    return template(this);
};


Filters.loadAll = function() {
    globalCallOrder.push('Filters.loadAll called');
    // In the loop, grab out the filter and make it into an object for Handlebars
    if (localStorage.cachedFilters) {
        Filters.allFilters = localStorage.getItem('cachedFilters');
        filtersView.renderFilters()
    } else {
        console.log('im in the filters loadAll');
        var temp = Projects.allProjects.map(function(cur, i, array) {
            // use map to return an object built out of the parts I want
            // couldn't get the two templates to play nice, leaving this for now
            return { category: cur.category, pubDate: cur.pubDate };
        });
        console.log('results of the map are', temp);
        /*    .forEach(function(element) {
         Filters.allFilters.push(new Filters(element));
         });*/
        localStorage.setItem('cachedFilters', JSON.stringify(Filters.allFilters));
        filtersView.renderFilters()
    }
};
