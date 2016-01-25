app.controller('buscaController', function ($scope, buscaService) {

	$scope.h1Tags = [];
	$scope.loading = false;

	this.submit = function() {

		$scope.loading = true;

		buscaService.post({'url' : $scope.formBusca.url.$modelValue}).success(function(response) {
			$scope.head = response.head;
			$scope.tags = response.Headings;

			$scope.chartObject = {};
			$scope.chartObject.type = "PieChart";

			var data = [];
			angular.forEach(response.Headings, function(el, key) {
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