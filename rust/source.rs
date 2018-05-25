#[no_mangle]
pub fn SumSquares(n: usize) -> f64 {
    let mut total = 0f64;
    for x in 0..n {
        total = total + (x as f64 * x as f64);
    }

    total
}