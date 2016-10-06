

var githubView = {};

githubView.renderPage = function() {

    ghObj.allRepos.forEach(function(repo){
        if (!repo.fork) 
            $('#github').append(repo.createRepoHtml());
    })
};


ghObj.requestRepos();