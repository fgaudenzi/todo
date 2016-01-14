app= angular.module('todoApp', []);




app.controller('TodoController', function ($scope) { 
	$scope.appTitle = "Tutorial todoApp";
	$scope.appHeadline = "Questa app permete di salvare i propri todos nel local storage";
	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'Imparare AngularJS', done: false}, {text: 'Costruire una App AngularJS', done: false} ];
	localStorage.setItem('todos', JSON.stringify($scope.todos));

	$scope.addTodo = function() {
		$scope.todos.push({
			text: $scope.todoText,
			done: false
		});
		$scope.todoText = ''; //clear the input after adding
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		return count;
	};


	$scope.delete = function(pos){
		//.remove(pos);
		
		$scope.todos.splice(pos, 1);
		localStorage.setItem('todos', JSON.stringify($scope.todos));

	}
	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
});