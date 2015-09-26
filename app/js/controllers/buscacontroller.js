app.controller('buscaController', function ($scope, buscaService) {

	$scope.h1Tags = [];
	$scope.loading = false;

	this.submit = function() {

		$scope.loading = true;

		buscaService.post({'url' : $scope.formBusca.url.$modelValue})
			.success(function(response) {
				$scope.h1Tags = response.h1;
			})
			.finally(function () {
				$scope.loading = false;
			});
	};
});