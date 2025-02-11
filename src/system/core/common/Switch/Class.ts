import { Primitive } from '../../../../Primitive'
import { System } from '../../../../system'

export type I<T> = {
  a: T
  b: T
  c: boolean
}

export type O<T> = {
  i: T
}

export default class Switch<T> extends Primitive<I<T>, O<T>> {
  private _current: string

  constructor(system: System) {
    super(
      {
        i: ['a', 'b', 'c'],
        o: ['a'],
      },
      {},
      system
    )
  }

  onDataInputData() {
    if (this._active_o_count === 0) {
      if (this._i.a !== undefined && this._i.c === true) {
        this._current = 'a'
        this._forward('a', this._i[this._current])
      } else if (this._i.b !== undefined && this._i.c === false) {
        this._current = 'b'
        this._forward('a', this._i[this._current])
      }
    }
  }

  onDataInputDrop(name: string) {
    if (this._current === name || name === 'c') {
      this._forward_all_empty()
    }
  }

  onDataOutputDrop() {
    this._done()
  }

  private _done() {
    const current = this._current
    this._current = undefined
    this._input[current].pull()
    this._input.c.pull()
  }
}
