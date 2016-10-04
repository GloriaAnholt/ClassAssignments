(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var resumeController = {};

    resumeController.showResume = function() {
        $('.tab-content').hide();
        $('.tab-content').filter('#resume').fadeIn('slow');
    };
    module.resumeController = resumeController;
})(window);