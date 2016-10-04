(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var statsController = {};

    statsController.showStats = function() {
        $('.tab-content').hide();
        $('#stats').fadeIn('slow');
    };
    module.statsController = statsController;
})(window);