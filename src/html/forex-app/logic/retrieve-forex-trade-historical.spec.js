 describe('retrieveForexTradeHistorical()', () => {

     describe('when no string parameters', () => {
         let a

         beforeEach(() => {
             a = [true, {}, function() {}, new Date, []].random()

         })

         it('should fail some no string parameter', () => {
             expect(() => retrieveForexTradeHistorical(a, a, a, a)).toThrowError(InvalidOjectError)
         })
     })

     describe('when null  parameters', () => {
         let a, b, c

         beforeEach(() => {
             a = null,
                 b = null,
                 c = null
         })

         it('should fail on some null parameter', async() => {

             expect(() => retrieveForexTradeHistorical(a, b, c, c)).toThrowError(NullObjectError)


             // expect(ret).toBeNull(); expect(() => retrieveForexTradeHistorical(a, b, c, c)).toThrowError(NullObjectError)
         })
     })

     describe('when wrong user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos2'
             c = 'demo'
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })

         it('should fail for unregistred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await retrieveForexTradeHistorical(tok, 'EURUSD', Date.now(), Date.now());
             expect(ret).toBeNull();


         })
     })

     describe('when valid user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'
             c = 'demo'
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })



         it('should return data for registred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var dstar = new Date();
             var dend = new Date();
             dstar.setDate(dend.getDate() - 2);
             var ret = await retrieveForexTradeHistorical(tok, 'EURUSD', dstar.getTime(), dend.getTime());
             expect(ret.returnData).not.toBeNull();

         })
     })


 })