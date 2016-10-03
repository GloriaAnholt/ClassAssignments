(function(module){
    // Make a controller object, give it a show method, pass it to the global
    var portfolioController = {};

    portfolioController.showPortfolio = function() {
        $('.tab-content').hide();
        $('.tab-content').filter('#projects').fadeIn('slow');
    };
    module.portfolioController = portfolioController;
})(window);