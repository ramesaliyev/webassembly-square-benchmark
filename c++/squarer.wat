(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "_Z10sumSquaresd" (func $_Z10sumSquaresd))
 (func $_Z10sumSquaresd (; 0 ;) (param $0 f64) (result f64)
  (local $1 f64)
  (local $2 i32)
  (local $3 f64)
  (local $4 f64)
  (set_local $4
   (f64.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.or
     (f64.lt
      (get_local $0)
      (f64.const 0)
     )
     (tee_local $2
      (f64.ne
       (get_local $0)
       (get_local $0)
      )
     )
    )
   )
   (set_local $3
    (f64.const 0)
   )
   (set_local $4
    (f64.const 0)
   )
   (loop $label$1
    (set_local $4
     (f64.add
      (get_local $4)
      (f64.mul
       (get_local $3)
       (get_local $3)
      )
     )
    )
    (set_local $3
     (tee_local $1
      (f64.add
       (get_local $3)
       (f64.const 1)
      )
     )
    )
    (br_if $label$1
     (i32.eqz
      (i32.or
       (f64.gt
        (get_local $1)
        (get_local $0)
       )
       (i32.or
        (f64.ne
         (get_local $1)
         (get_local $1)
        )
        (get_local $2)
       )
      )
     )
    )
   )
  )
  (get_local $4)
 )
)