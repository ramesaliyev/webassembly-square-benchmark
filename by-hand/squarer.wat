(module
  (func $sumSquares (param $value i32) (result f64)
    (local $sum f64)
    (local $i f64)
    
    (set_local $sum (f64.const 0))
    (set_local $i (f64.const 0))
    
    (block
      (loop
        (set_local $sum
          (f64.add
            (get_local $sum)
            (f64.mul
              (get_local $i)
              (get_local $i)
            )
          )
        )
        (set_local $i
          (f64.add
            (get_local $i)
            (f64.const 1)
          )
        )
        (br_if 0
          (tee_local $value
            (i32.add
              (get_local $value)
              (i32.const -1)
            )
          )
        )
      )
    )
    
    get_local $sum
  )
  (export "sumSquares" (func $sumSquares))
)
