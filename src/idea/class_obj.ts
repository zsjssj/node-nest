class testA {
  a: string
  b: { q: string }
  c: { w: string }
  d: { ab: { q: string }; ac: { w: string } }
  constructor(oa: string, ob: { q: string }, oc: { w: string }) {
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
