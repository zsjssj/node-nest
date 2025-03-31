class testA<T> {
  a: T
  b: { q: T }
  c: { w: T }
  d: { ab: { q: T }; ac: { w: T } }
  constructor(oa: T, ob: { q: T }, oc: { w: T }) {
    this.a = oa
    this.b = ob
    this.c = oc
    this.init()
  }
  init(): void {
    this.d = { ab: this.b, ac: this.c }
  }
}

const a = new testA('a', { q: 'bb' }, { w: 'cc' })
console.log('a.d.ab.q', a.d.ab.q)
a.d.ab.q = 'zsj_dd'
console.log('a', a)
