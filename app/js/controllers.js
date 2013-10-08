'use strict';

/* Controllers */

angular.module('portfolio',[]).controller('PortfolioCtrl', function($scope){

	$scope.model ={
		stockName:'',
		amount:'',
		positions:[{name:'PTT', amount:1000, price:319,total:319000}]
	};

	$scope.addToPortfolio = function(stockName, amount, positions){
		var stockQuote = new StockQuote();
		var price = stockQuote.getPrice(stockName); 
		positions.push({
			name:stockName, 
			amount:amount,
			price: price,
			total: amount*price
		});
	};

	$scope.totalValue = function(positions) {
		var total = 0;
		for(var k=0; k<positions.length; k++){
			total = total + positions[k].total;
		}
		return total;
	}
});



function StockQuote(){
	this.maxPrice = 300;
	this.minPrice = 20;
	this.getPrice = function(stock){
		return Math.random() * (this.maxPrice - this.minPrice);
	}
}


