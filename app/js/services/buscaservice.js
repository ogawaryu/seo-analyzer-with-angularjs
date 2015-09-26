app.service('buscaService', ['$http',function ($http) {
	this.get = function(params) {
		return $http.get("/busca.php");
	}
}]);