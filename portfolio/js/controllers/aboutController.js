(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var aboutController = {};

    aboutController.showAbout = function() {
        $('.tab-content').hide();
        $('.tab-content').filter('#about').show();
    };

    module.aboutController = aboutController;
})(window);