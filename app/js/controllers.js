'use strict';

/* Controllers */

angular.module('teambookManager',[])

.controller('teambookCtrl', function($scope)
{
	$scope.teambook ={
		newMemberName:'',
		members :[]
	};

	$scope.teambook.addName = function(name){
		$scope.teambook.members.push({name: name});
	};

})



