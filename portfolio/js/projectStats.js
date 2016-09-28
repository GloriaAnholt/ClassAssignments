// Here are some stats about the projects

projectsView.initStatsPage = function() {

    var template = Handlebars.compile($('#stats-template').html());

    Projects.statsBuilder().forEach(function(project) {
        $('#filters-template').append(template(project));
    })
};

Projects.fetchAll(projectsView.initStatsPage);