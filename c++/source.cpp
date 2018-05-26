double sumSquares(int n) {
  double total = 0;
  for (int i=0; i<=n; i++) {
    total += (double) i * i;
  }
  return total;
}
