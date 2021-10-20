import { getUniqueId } from './utils'

describe('utils', () => {
  describe('getUniqueId', () => {
    it('should generate random unique id', () => {
      const id1 = getUniqueId()
      const id2 = getUniqueId()

      expect(id1).not.toBe(id2)
    })
  })
})
