app.service('buscaService', ['$http',function ($http) {
	this.post = function(params) {
		return $http.post("/busca.php", params);
	}
}]);