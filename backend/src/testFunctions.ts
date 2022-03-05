function testSum(a: number, b: number) {
  if (!a) throw Error('a cannot be empty');
  return a + b;
}

function testMult(a: number, b: number) {
  return a * b;
}

function returnProperties(
  obj: { [key: string]: string | boolean | object },
  properties: string[]
) {
  const result: { [key: string]: string | boolean | object } = {};

  properties.map((property) => {
    if (obj.hasOwnProperty(property)) {
      result[property] = obj[property];
    }
  });

  return result;
}

export { testSum, testMult, returnProperties };
