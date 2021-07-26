import { queryParams } from './queryParams';

describe('queryParams', () => {
    it('should return a correct value', () => {
        expect(queryParams({
            search: 'withdraw'
        })).toEqual('search=withdraw')
    })
})
