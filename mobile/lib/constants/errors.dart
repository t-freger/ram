/// Base class which is used to check if an Exception is a custom exception
sealed class ramErrors {
  const ramErrors();
}

class NoResponseDtoError extends ramErrors implements Exception {
  @override
  String toString() => "Response Dto is null";
}
