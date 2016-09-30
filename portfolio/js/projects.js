// This app reads project data from the projectList.js file and populates the
// index.html page using Handlebars.

var globalCallOrder = [];


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
    var newHtml = template(this);

    return newHtml;
};


Filters.loadAll = function() {
    globalCallOrder.push('Filters.loadAll called');
    // In the loop, grab out the filter and make it into an object for Handlebars
    if (localStorage.cachedFilters) {
        var savedFilters = localStorage.getItem('cachedFilters');
        //Projects.loadAll(JSON.parse(savedFilters));
        filtersView.renderFilters();
    } else {
        Projects.allProjects.map(function(cur, i, array) {
            // use map to return an object built out of the parts I want
            // couldn't get the two templates to play nice, leaving this for now
            return { category: cur.category, pubDate: cur.pubDate };
        }).forEach(function(element) {
            Filters.allFilters.push(new Filters(element));
        });
        filtersView.renderFilters();
    }
};


function Projects (data) {
    globalCallOrder.push('Projects called');
    for (var key in data)
        this[key] = data[key];
}

// Instead of using a global array, add the array to the class (not instances!)
Projects.allProjects = [];

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


Projects.getUpdatedProjects = function() {
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
            console.log('im in getUpdatedProjects successful ajax', data);
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
    globalCallOrder.push('Projects.loadAll called');
    var newdata = data.sort(function (cur, next) { return (cur.ranking - next.ranking) });
    console.log('in Projects.loadAll, data ', newdata);
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


Projects.fetchAll = function() {
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