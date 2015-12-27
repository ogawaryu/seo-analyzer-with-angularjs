app.controller('buscaController', function ($scope, buscaService) {

	$scope.h1Tags = [];
	$scope.loading = false;

	this.submit = function() {

		$scope.loading = true;

		buscaService.post({'url' : $scope.formBusca.url.$modelValue}).success(function(response) {
			$scope.tags = response;

			$scope.chartObject = {};
			$scope.chartObject.type = "PieChart";

			var data = [];
			angular.forEach(response, function(el, key) {
				data.push({c: [ {v: el.heading }, {v: el.values.length }]});
			});
			
			$scope.chartObject.data = {"cols": [
				{id: "t", label: "Topping", type: "string"},
				{id: "s", label: "Slices", type: "number"}
			], "rows": data };

			$scope.chartObject.options = {
				'title': 'Total de Headings'
			};

		}).finally(function () {
			$scope.loading = false;
		});
	};
});