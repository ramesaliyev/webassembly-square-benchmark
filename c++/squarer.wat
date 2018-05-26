(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "_Z10sumSquaresi" (func $_Z10sumSquaresi))
 (func $_Z10sumSquaresi (; 0 ;) (param $0 i32) (result f64)
  (local $1 f64)
  (local $2 f64)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $0)
     (i32.const 0)
    )
   )
   (set_local $0
    (i32.add
     (get_local $0)
     (i32.const 1)
    )
   )
   (set_local $1
    (f64.const 0)
   )
   (set_local $2
    (f64.const 0)
   )
   (loop $label$1
    (set_local $2
     (f64.add
      (get_local $2)
      (f64.mul
       (get_local $1)
       (get_local $1)
      )
     )
    )
    (set_local $1
     (f64.add
      (get_local $1)
      (f64.const 1)
     )
    )
    (br_if $label$1
     (tee_local $0
      (i32.add
       (get_local $0)
       (i32.const -1)
      )
     )
    )
   )
   (return
    (get_local $2)
   )
  )
  (f64.const 0)
 )
)
