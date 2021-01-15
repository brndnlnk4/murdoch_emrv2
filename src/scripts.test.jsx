import _ from 'lodash';
{/*

//test("2 + 2 should equal 4", () => {
//	expect(functions.add(2, 2)).toBe(4);
//})
//
//test("2 + 3 should NOT equal 4", () => {
//	expect(functions.add(2, 3)).not.toBe(4);
//})

test('the image should be less than 10kb', () => {

	const fetchSrc = axios(...)

 return fetchSrc().then(data => {
   expect(size).toBe(10);
 });
});

test('the image type should be a jpeg', async () => {

	const data = await axios(...);

	expect(data)
	expect(data).toBe('jpeg')
})

test('')
*/}

describe("build a qry statement with qry helper fn for mysql", () => {


  const { query } = ModelInterface
  const table = query('patients');


  test('build SELECT & WHERE statement with string args for mysql', () => {

    const select1 = table.select('patient_name')
    const select1Where = select1.where('id', 2).qry

    console.log(`qry: ${select1Where}`);

    expect(select1Where).toBeDefined()
    expect(typeof select1Where).toEqual('string')
  })

  test("build SELECT & WHERE statement with Object args for mysql", () => {

    const select1 = table.select();
    const select1WhereObjArg = select1.where({id: 3}).qry;

    console.log(`qry.where method: `, select1WhereObjArg);

    expect(select1WhereObjArg).toBeDefined();
    expect(typeof select1WhereObjArg).toEqual('string');
  });

})
