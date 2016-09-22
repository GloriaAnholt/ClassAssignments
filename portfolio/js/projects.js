// This app reads project data from the projectList.js file and populates the
// index.html page using Handlebars.

var projectArray = [];

function Projects (data) {
    for (var key in data)
        this[key] = data[key];
}

Projects.prototype.createHtml = function() {
    // This function grabs the template section of the page as a jQuery object,
    // and uses Handlebars to populates its values with the details from a
    // the projectList array

    var $sourceHtml = $('#projects-template').html();
    var template = Handlebars.compile($sourceHtml);
    this.pubDate = this.pubDate ?
        'Published on: ' + this.pubDate + ", about " +
        parseInt(new Date() - new Date(this.pubDate)/3600/24/1000) +
        'days ago.' : '(draft)';
    var newHtml = template(this);
    
    return newHtml;
};

myBlogPosts.sort(function(cur, next) {
    // subtract the next from the current and return to the sort function,
    // so it can sort things by date for you
    return ( (new Date(next.pubDate)) - (new Date(cur.pubDate)) );
});

myBlogPosts.forEach(function(element) {
    // For each thing in the array of blog posts, use the constructor to make
    // it into an object, have it's attributes updates, then push into the
    // array which is going to be drawn to the page
    projectArray.push(new Projects(element));
});

projectArray.forEach(function(a) {
    $('#projects').append(a.createHtml());
});