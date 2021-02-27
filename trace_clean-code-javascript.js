const moment = require('moment');
// 参考：https://github.com/mitsuruog/clean-code-javascript/

// <Variables>

// 意味があり発音可能な変数名を利用すること
const currentDate = moment().format('YYYY/MM/DD');


// 同じタイプの変数には同じ単語を利用すること
// getUser();


// 変数名を検索可能な名前にする
const MILLSECONDS_IN_A_DAY = 86400000
setTimeout(blastOff, MILLSECONDS_IN_A_DAY);


// 説明的な変数を利用すること
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
// Bad: saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveSityZipCode(city, zipCode)   // 「test[1]」 ではなく、「zipCodeをinするよ」⇒わかりやすい


// 暗黙的よりも、明らかな方が優れている
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((location) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Bad: dispatch(1)    // <= ちょっと待って、「1」ってなんだっけ？
  dispatch(location);
});


// 不必要なコンテキストを加えない。つまり、名前の一部も重複させない
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue'
};
function paintCar(car) {
  // Bad: car.carColor = 'Red';
  car.color = 'Red';
}


// 短絡評価や条件の代わりにデフォルト引数を利用する
// => 短絡評価より、「デフォルト引数」の方が明確。（な場合が多い）
function createMicrobrewery(name = 'Hipster Brew Co.') {
  // Bad: const breweryName = name || 'Hipster Brew Co.';
}


// <Functions>

// 関数の引数は「2つ以下」が理想的。 3つもできるなら避ける。
// Why? A. テストが簡単に行えるから。 多いと組合せ爆発。
// 多い時は、オブジェクト作って。

// Bad
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

function createMenu({ title, body, buttonText, cancellable }){
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});


// 関数は1つのことを行うこと。（もっとも重要なルール）
// Why? A. このルールを守れないと、テストやリファクタリングが難しくなるから。
// 「何か1つだけ守るなら？」「これだけは守って」と言われるやつ

// Bad: 
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// Good:
function emailActiveClients(clients){
  clients
    .filter(isActiveClient)
    .forEach(email)
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}


// 関数名は何をするかを表すこと
// Bad: function addToDate(date, month) {  // <= 「何が追加されたの？」が関数名から分かりにくい

function addMonthToDate(month, date) {
  // ...
}


// 関数はただ1つの抽象化をすること。
// 2つ以上の抽象化をしているなら、その関数は多くをやりすぎている
// Why? A. 再利用やテストが簡単でなくなっていくから。


// 重複したコードを絶対に避ける。
// Why? A. 同じ変更を、2箇所以上にしなくちゃいけないのは、バグの温床。悪！
// 「更新する場所はたった1つ」の方がずっといいでしょ？


// 手続き型プログラミングより関数型プログラミングを優先する
// Why? A. テストがしやすいから。クリーンに保ちやすいから。
// Bad: 
// for (let i = 0; i < programmerOutput.length; i++) {
//   totalOutput += programmerOutput[i].linesOfCode;
// }
const totalOutput = programmerOutput
  .map(output => output.linesOfCode)
  .reduce((totalLines, lines) => totalLines + lines);


// メソッドチェーンを利用すること
// 「メソッドチェーンを使って、あなたのコードがどれくらいきれいになるか見てください」
class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  setMake(make) {
    this.make = make;
    // NOTE: Returning this for chaining
    // NOTE: チェーンするためにthisを返します
    return this;
  }

  setModel(model) {
    this.model = model;
    // NOTE: Returning this for chaining
    // NOTE: チェーンするためにthisを返します
    return this;
  }

  setColor(color) {
    this.color = color;
    // NOTE: Returning this for chaining
    // NOTE: チェーンするためにthisを返します
    return this;
  }

  save() {
    console.log(this.make, this.model, this.color);
    // NOTE: Returning this for chaining
    // NOTE: チェーンするためにthisを返します
    return this;
  }
}

const car = new Car('Ford','F-150','red');
  .setColor('pink')
  .save();



// 単一責任の原則（SRP）
// 「クラスが変更される理由は、1つ以上あってはならない」
// Why? A. 多くの機能が1クラスにあると、変更を影響を気にする範囲が多くなる。つまり、変更に時間がかかるから。


