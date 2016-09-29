// Here are some stats about the projects

projectsView.initStatsPage = function() {

    var template = Handlebars.compile($('#stats-template').html());

    Projects.statsBuilder().forEach(function(project) {
        $('#stats article').append(template(project));
    })
    $('#stats article').append('<p>The cumulative projects have ' + Projects.totalWordCount() +
        ' total words.</p>');
};

//Projects.fetchAll(projectsView.initStatsPage);