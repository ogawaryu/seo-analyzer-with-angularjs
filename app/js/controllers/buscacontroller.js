app.controller('buscaController', function ($scope, buscaService) {

	$scope.h1Tags = [];
	$scope.loading = false;

	this.submit = function() {

		$scope.loading = true;

		buscaService.post({'url' : $scope.formBusca.url.$modelValue})
			.success(function(response) {
				$scope.tags = response;
			})
			.finally(function () {
				$scope.loading = false;
			});
	};
});