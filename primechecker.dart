bool isPrime(int n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 == 0 || n % 3 == 0) return false;
  int i = 5;
  while (i * i <= n) {
    if (n % i == 0 || n % (i + 2) == 0) return false;
    i += 6;
  }
  return true;
}

List<int> primeFactors(int n) {
  List<int> factors = [];
  var num = n;
  // count number of 2s
  while (num % 2 == 0) {
    factors.add(2);
    num ~/= 2;
  }
  // odd factors
  for (int i = 3; i * i <= num; i += 2) {
    while (num % i == 0) {
      factors.add(i);
      num ~/= i;
    }
  }
  // if remaining > 2 it's prime
  if (num > 2) {
    factors.add(num);
  }
  return factors;
}

void main(List<String> args) {
  if (args.isEmpty) {
    print('Usage: dart prime_checker.dart <number>');
    return;
  }
  final n = int.tryParse(args[0]);
  if (n == null) {
    print('Please pass a valid integer.');
    return;
  }

  print('Is $n prime? ${isPrime(n)}');
  print('Prime factors of $n: ${primeFactors(n)}');
}