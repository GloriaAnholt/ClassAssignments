(function(module) {
    // This IIFE holds the logic for what data should end up on the github tab page

    // Constructor function to turn ajax data into gh objects
    function ghObj(repoData) {
        for (var key in repoData)
            this[key] = repoData[key];
    }

    // Make an array to hold the gh objects returned by ajax
    ghObj.allRepos = [];

    ghObj.prototype.createRepoHtml = function() {
        var $sourcehtml = $('#github-template').html();
        var template = Handlebars.compile($sourcehtml);
        return template(this);
    };

    ghObj.requestRepos = function() {
        // Makes the AJAX call to my webserver (which routes with the token to gh)
        // if successful passes to loadAll to process
        $.ajax({
            method: 'GET',
            url: '/github/users/GloriaAnholt/repos',
            success: function(data, status, xhr) {
                ghObj.loadAllRepos(data);
                githubView.renderPage();
            },
            error: function(xhr, settings, error)  {
                console.log('Github returned a ' + error + 'error.');
            }
        }); // close ajax
    }; // close requestRepos function

    ghObj.loadAllRepos = function(repoData) {
        // Takes data from the AJAX response object and makes into a ghObject to give access to methods
        ghObj.allRepos = repoData.map(function(repo) {
            return new ghObj(repo);
        })
    };  // close loadAllRepos


    module.ghObj = ghObj;
})(window);