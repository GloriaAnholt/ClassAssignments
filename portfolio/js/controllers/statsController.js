(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var statsController = {};

    statsController.showStats = function() {
        $('.tab-content').hide();
        $('.tab-content').filter('#stats').show();
    };
    module.statsController = statsController;
})(window);