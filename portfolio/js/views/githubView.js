

var githubView = {};

githubView.renderPage = function() {

    ghObj.allRepos.forEach(function(repo){
        $('#github').append(repo.createRepoHtml());
    })
};


ghObj.requestRepos();