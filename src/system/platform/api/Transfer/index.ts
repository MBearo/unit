import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { B } from '../../../../interface/B'
import { CH } from '../../../../interface/CH'

interface I<T> {
  unit: CH
  data: B
}

interface O<T> {}

export default class Transfer<T> extends Functional<I<T>, O<T>> {
  constructor() {
    super(
      {
        i: ['unit', 'data'],
        o: [],
      },
      {
        input: {
          unit: {
            ref: true,
          },
          data: {
            ref: true,
          },
        },
      }
    )
  }

  async f({ unit, data }: I<T>, done: Done<O<T>>) {
    try {
      await unit.send(data)
    } catch (err) {
      done(undefined, err.message)
      return
    }
    done({})
  }
}
