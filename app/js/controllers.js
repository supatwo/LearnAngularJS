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

var PortfolioFactory = function (stockQuote) {
	var positions = [{name:'PTTE', amount:1000, price:168, total:168000}];
	var feed = "dummy";
	return {
		addToPortfolio : function(stockName, amount, positions){
							var price = stockQuote.getPrice(stockName); 
							positions.push({
								name:stockName, 
								amount:amount,
								price: price,
								total: amount*price});
							},
		totalValue 		: function(positions) {
							var total = 0;
							for(var k=0; k<positions.length; k++){
								total = total + positions[k].total;
							}
							return total;
						},
		positions : positions

		}
}


angular.module('portfolio',[])
	.value('stockQuote', new StockQuote())	
	.service('portfolioService', PortfolioService)
	.factory('portfolioFactory', PortfolioFactory)
	.provider('portfolioData', function(stockQuote){
		    var config ={feed:""};
			var positions = [{name:'PTTE', amount:1000, price:168, total:168000}];
		return {
			
	
			setFeed : function(feed){
				config.feed = feed;
			}

			$get: function()
			return {
				addToPortfolio : function(stockName, amount, positions){
					var price = stockQuote.getPrice(stockName); 
					positions.push({
						name:stockName, 
						amount:amount,
						price: price,
						total: amount*price});
				},
				totalValue 		: function(positions) {
					var total = 0;
					for(var k=0; k<positions.length; k++){
						total = total + positions[k].total;
					}
					return total;
				},
				positions : positions

			}
		}
	})
	.config(function(portfolioDataProvider){


	}).
	.controller('PortfolioCtrl', function($scope, portfolioData){
		$scope.model ={
			stockName:'',
			amount:'',
			positions:[]
		};

		$scope.model.positions = portfolioFactory.positions;
		//console.log(portfolioService.positions);

		$scope.addToPortfolio = portfolioFactory.addToPortfolio;
		$scope.totalValue = portfolioFactory.totalValue;
	})

