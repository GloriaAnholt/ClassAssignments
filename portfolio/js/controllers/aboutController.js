(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var aboutController = {};

    aboutController.showAbout = function() {
        $('.tab-content').hide();
        $('#about').fadeIn('slow');
        $('#about article').fadeIn('slow');
    };

    module.aboutController = aboutController;
})(window);