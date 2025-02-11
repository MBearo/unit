import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { Specs } from '../../../../types'

export interface I<T> {
  any: any
}

export interface O<T> {
  specs: Specs
}

export default class _Specs<T> extends Functional<I<T>, O<T>> {
  constructor() {
    super({
      i: ['any'],
      o: ['specs'],
    })
  }

  f({ any }: I<T>, done: Done<O<T>>): void {
    const { specs } = this.__system

    done({ specs })
  }
}
