// This app reads project data from the projectList.js file and populates the
// index.html page using jQuery.

var projectArray = [];

function Projects (data) {
    this.title = data.title;
    this.link = data.link;
    this.category = data.category;
    this.body = data.body;
    this.imagesrc = data.imagesrc;
    this.imagealt = data.imagealt;
    this.pubDate = data.pubDate;
}

Projects.prototype.createHtml = function() {
    // This function grabs the template section of the page as a jQuery object,
    // populates its values with the details from a project, then returns an
    // updated object, without the template class

    var $currentProject = $('article.projectsTemplate').clone();
    $currentProject.find('h2').text(this.title);
    $currentProject.find('a').not('.read-more').attr('href', this.link);
    $currentProject.find('p.projectBody').html(this.body);
    $currentProject.find('img').attr('src', this.imagesrc);
    $currentProject.find('img').attr('alt', this.imagealt);
    $currentProject.find('div').text(this.pubDate + ',');

    $currentProject.find('time[pubdate]').attr('title', this.pubDate);
    $currentProject.find('time').html('about ' + parseInt(new Date() - new Date(this.pubDate))/3600/24/1000 + ' days ago.');

    $currentProject.removeClass('projectsTemplate');
    return $currentProject;
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