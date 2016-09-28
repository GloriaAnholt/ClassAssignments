// Here are some stats about the projects

projectsView.initStatsPage = function() {

    var template = Handlebars.compile($('#stats-template').html());

    Projects.statsBuilder().forEach(function(project) {
        $('#stats').append(template(project));
    })
    $('#stats').append('<li>The cumulative projects have ' + Projects.totalWordCount() +
        ' total words.');
};

Projects.fetchAll(projectsView.initStatsPage);