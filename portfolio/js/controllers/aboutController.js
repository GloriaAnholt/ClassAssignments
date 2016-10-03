(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var aboutController = {};

    aboutController.showAbout = function() {
        $('.tab-content').hide();
        $('.tab-content').filter('#about').fadeIn('slow');
    };

    module.aboutController = aboutController;
})(window);