(function(module){
    // Hides the other tabs' content, shows just the github tab

    var githubController = {};

    githubController.showGithub = function() {
        $('.tab-content').hide();
        $('#github').fadeIn('slow');
        $('#github article').fadeIn('slow');
    };

    module.githubController= githubController;
})(window);