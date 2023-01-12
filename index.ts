import * as deepEqual from 'deep-equal';
//等価演算子の同一性
console.log(deepEqual({ a: 123 }, { a: 123 }));

//idでのチェック
type IdDisplay = {
  id: string,
  display: string
}
const list: IdDisplay[] = [
  { id: 'foo', display: 'Foo select' },
  { id: 'boo', display: 'Boo select' },
]
const fooIndex = list.map(i => i.id).indexOf('foo');
console.log(fooIndex);

//参照：リファレンス
var foo = {};
var bar = foo;
var baz = {};
//比較は参照に対して行われる
console.log(foo === bar);
console.log(foo === baz);

//nullとundefined
//null: 現在利用できない
//undefined: 初期化されていない
console.log(undefined == undefined);
console.log(null == undefined);
console.log(0 == undefined);
console.log('' == undefined);
console.log(false == undefined);

//==nullを使ってundefinedとnull両方をチェックする
function nullCheck(arg: string | null | undefined) {
  if (arg != null) {
    console.log("check: argはstringです：" + arg);
  } else {
    console.log("check: x");
  }

}
nullCheck(undefined);
nullCheck(null);
nullCheck("$$$");

//ルートレベルのundefinedチェック
var someglobal = 12;
//変数が_global_レベルで定義されているかどうかを確認
if (typeof someglobal !== 'undefined') {
  console.log(someglobal);
}

//undefined の明示的な利用を制限する
function undefinedCheck(num: number):{a:number, b?:number} {
  if (num > 0) {
    return { a: 1, b: 2 };
  } else {
    return { a: 1 };
  }
}
console.log(undefinedCheck(10));
console.log(undefinedCheck(-10));

//Nodeスタイルのコールバック

//値の有効性を表す意味でundefinedを使用しない→良い例
function toInt(str: string): { valid: boolean, int?: number } {
  const int = parseInt(str);
  if (isNaN(int)) {
    return { valid: false };
  } else {
    return { valid: true, int };
  }
}
console.log(toInt("12"));
console.log(toInt("s"));

//JSONとシリアライズ
/*
JSON標準では、nullのエンコードはサポートしていますが、undefinedのエンコードはサポートしていません。値がnullである属性を持つオブジェクトをJSONにエンコードするとき、その属性はnull値とともにJSONに含まれますが、値がundefinedである属性は完全に除外されます。
 */
console.log(JSON.stringify({ willStay: null, willBeGone: undefined }));

//クロージャ
//クロージャの素晴らしい点：内側の関数は、外側の関数がreturnされた後でも変数にアクセスできます。
function outerFunction(arg: string): any {
  const variableInOuterFunction = arg;

  return function() {
    console.log(variableInOuterFunction); //外部スコープにある変数にアクセスします
  }
}
var innerFunction = outerFunction("hello closure!");
//outerFunctionが返しているものに注意する
innerFunction();

//なぜクロージャが素晴らしいか
//オブジェクトを簡単に作成することができます。リヴィーリングモジュール(revealing module pattern)というコーディングパターンがあります：
function createCounter() {
  let val = 0;
  return {
    increment() { val++ },
    getVal() {return val}
  }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); //1
counter.increment();
console.log(counter.getVal()); //2
