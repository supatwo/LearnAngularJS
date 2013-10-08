'use strict';

/* Controllers */

function StockQuote(){
	this.maxPrice = 300;
	this.minPrice = 20;
	this.getPrice = function(stock){
		return Math.random() * (this.maxPrice - this.minPrice);
	}
}

var PortfolioService = function (stockQuote) {
	this.positions = [{name:'PTTE', amount:1000, price:168, total:168000}];
	
	this.addToPortfolio = function(stockName, amount, positions){
			var price = stockQuote.getPrice(stockName); 
						
			positions.push({
				name:stockName, 
				amount:amount,
				price: price,
				total: amount*price
			});
		};

	this.totalValue = function(positions) {
			var total = 0;
			for(var k=0; k<positions.length; k++){
				total = total + positions[k].total;
			}
			return total;
		};
}

angular.module('portfolio',[])
	.value('stockQuote', new StockQuote())	
	.service('portfolioService', PortfolioService)
	.controller('PortfolioCtrl', function($scope, portfolioService){
		$scope.model ={
			stockName:'',
			amount:'',
			positions:[]
		};

		$scope.model.positions = portfolioService.positions;
		//console.log(portfolioService.positions);

		$scope.addToPortfolio = portfolioService.addToPortfolio;
		$scope.totalValue = portfolioService.totalValue;
	});
