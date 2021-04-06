# Installation

## 1 [Getting Started](https://reactjs.org/docs/getting-started.html)

React ドキュメントと関連リソースの概要。

### Try React

React を試せるオンラインコードエディタとして、[CodePen](https://reactjs.org/redirect-to-codepen/hello-world), [CodeSandbox](https://codesandbox.io/s/new), [Stackblitz](https://stackblitz.com/fork/react) が紹介されている。

足元のテキストエディタで試すために、[サンプルの HTML ファイル](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)も紹介されている。Babel standalone を使うことで、ブラウザ上でその場で特殊な JSX 形式を JavaScript に変換している：
``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

また、次のセクションでは、HTML ページに React を追加する方法が紹介される。その次のセクションでは、大規模なアプリケーション用に JavaScript ツールチェインを使った方法が紹介されている。

### Learn React

- [React Tutorial](https://reactjs.org/tutorial/tutorial.html): １ページにまとまったチュートリアル。ただし Hook は使っていないし、長さ的に内容も限りがある。
- [Main Concepts](https://reactjs.org/docs/hello-world.html): 複数ページによるコンセプトガイド。
- [React トップページ](https://reactjs.org/): いくつかのシンプルな例があって、その場で編集できる。
- [Tania Rascia の React Tutorial](https://www.taniarascia.com/getting-started-with-react/): 上の React Tutorial と動揺のチュートリアル。2018年の記事で、やはり Hook は使っていないし、長さ的に内容も限りがある。
- [React for Designers](https://reactfordesigners.com/): デザイナー向けの React リソース。
- [JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript): JavaScript ドキュメント。[javascript.info](https://javascript.info/) も紹介されている。
- [React Blog](https://reactjs.org/blog/): React の最新情報。

## 2 [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html)

### Add React in One Minute

React を HTML ページに追加する簡単な方法が紹介されている。

React で操作したい箇所に空の `<div>` 要素を追加して、`id` を付与する：

``` html
<div id="like_button_container"></div>
```

`</body>` 閉じタグの前に、スクリプトタグを追加する：

``` html
<!-- React をロードする -->
<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
<!-- 自作の React コードをロードする -->
<script src="like_button.js"></script>
```

自作の React コード `like_button.js` ファイルを用意する：

``` javascript
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked)
      return 'You liked this.';
    return React.createElement('button', { onClick: () => this.setState({ liked: true }) }, 'Like');
  }
}

ReactDOM.render(React.createElement(LikeButton), document.querySelector('#like_button_container'));
```

### Optional: Try React with JSX

`React.createElement` を使った純粋な JavaScript コードの代わりに、JSX で書く方法が紹介されている：

``` javascript
  return <button onClick={() => this.setState({ liked: true })}>Like</button>;
```

JSX を試す一番簡単な方法は以下の `<script>` タグを追加すること：
``` html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script src="like_button.js" type="text/babel"></script>
```

ただし、この方法はブラウザ上でその場でコンパイルするので遅くなるため、プロダクション向きでない。あらかじめ JSX コードを JavaScript に変換するには、Node.js を入れておいて、Babel パッケージをインストールして、コンパイルする。`src` ディレクトリに JSX コードのファイルがある場合：
``` shell
npm init -y
npm install babel-cli@6 babel-preset-react-app@3
npx babel --watch src --out-dir . --presets react-app/prod
```

## 3 [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html)

[Create React App](https://github.com/facebookincubator/create-react-app) を使うと、React のシングルページアプリケーションを簡単に作ることができる。バックエンドは扱わない。内部的に Babel と webpack を使っている。

``` shell
npx create-react-app my-app
cd my-app
npm start # 実行
npm run build # ビルド
```

[Next.js](https://nextjs.org/) は、React で静的/サーバサイドレンダリングのアプリケーションを作ることができる。スタイリングとルーティングにも対応している。

[Gatsby](https://www.gatsbyjs.org/) は、React で静的なサイトを作ることができる。

## 4 [CDN Links](https://reactjs.org/docs/cdn-links.html)

React と ReactDOM は CDN で利用可能である。

開発環境の React CDN リンク:
``` html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

プロダクション環境の React CDN リンク:
``` html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

CDN の React を使う場合、`crossorigin` 属性を付けるとよい。

# Main Concepts

## 1 [Hello World](https://reactjs.org/docs/hello-world.html)

最小の React コード例を見せる。

``` javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

## 2 [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

JSX という JavaScript の拡張記法を紹介する。React で UI を記述するときには、JSX を使うことをすすめる。

``` javascript
const heading = <h1>Hello, {formatName(user)}!</h1>;
const img = <img src={user.avaterUrl} />;
```

マークアップとロジックを別々のファイルに置いて技術を分離する代わりに、React はその両方を含んだ「コンポーネント」という疎結合の構成要素で関心分離を実現している。

JSX の中の波カッコに JavaScript 式を置くことができる。式の結果が埋め込まれる。デフォルトでは JSX で埋め込まれた値はエスケープされるので、インジェクション攻撃を防ぐことができる。

Babel は JSX を `React.createElement()` の呼び出しにコンパイルする：
``` javascript
// const element = <h1 className="greeting">Hello, world!</h1>;
const element = React.createElement('h1', {className: 'greeting'}, 'Hello, world!');
// => { type: 'h1', props: { className: 'greeting', children: 'Hello, world!' } }
```

## 3 [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)

React の要素のレンダリングについて説明する。DOM 要素と違って、React 要素はただのオブジェクトなので作成コストが安い。React DOM ライブラリが、React 要素に対応する DOM のアップデートを世話する。

まず HTML ファイルのどこかに `<div>` を置く。この中にあるものはすべては React DOM が管理するので、ルート DOM ノードと呼ぶ。

``` html
<div id="root"></div>
```

React 要素を ルート DOM ノードにレンダリングするには、`ReactDOM.render()` に引数として渡して呼ぶ：
``` javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

React 要素は不可変である。

UI を更新するために `ReactDOM.render()`を呼び直すことができる。ただ、多くの React アプリケーションでは `ReactDOM.render()` は一度しか呼ばない。

``` javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

## 4 [Components and Props](https://reactjs.org/docs/components-and-props.html)

React のコンポーネントを紹介する。コンポーネントは UI を再利用可能な部品として定義するものだ。コンポーネントは JavaScript 関数のようなもので、入力 (props) を受け付けて、表示したい React 要素を返す。

コンポーネントを定義する一番シンプルな方法は、JavaScript 関数を書くこと：
``` javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

別の方法は、クラスを定義すること：
``` javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

定義されたコンポーネントは、JSX で記述できる：
``` javascript
const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

コンポーネントの中でほかのコンポーネントを参照することができる。コンポーネントは props を変更してはいけない。props に対しては純粋関数のようにすること。

## 5 [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

React コンポーネントのステートとライフライクルの概念を紹介する。

例として、現在日時を表示するコンポーネント：
``` javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`setState()` メソッドは、コンポーネントのステート `this.state` の更新をスケジューリングする。`setState()` について知っておくべき３つのこと：
- ステートは直接修正してはいけない。
  - `this.state.comment = 'Hello'` でなく `this.setState({comment: 'Hello'})` とする。
- ステートの更新は非同期になるかもしれない。React はパフォーマンスを考慮して複数の `setState()` を１つの更新にまとめることがある。
  - `this.setState({counter: this.state.counter + this.props.increment})` でなく `this.setState((state, props) => ({counter: state.counter + props.increment}))` とする。
- ステートの更新はマージされる。マージはディープマージでなくシャローマージになる。

`componentDidMount()` メソッドは、コンポーネントが最初に DOM にレンダリングされた（マウントされた）あとに呼ばれる。

`componentWillUnmount()` メソッドは、コンポーネントが DOM から消える（アンマウントされる）ときに呼ばれる。

Note: 関数コンポーネントの場合、フックを使ってどうするか？

``` javascript
function Clock(props) {
  const [date, setDate] = React.useState(new Date());
  let timerID = null;

  React.useEffect(() => {
    timerID = setInterval(() => setDate(new Date()), 1000);
    return () => { clearInterval(timerID) };
  });

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```

## 6 [Handling Events](https://reactjs.org/docs/handling-events.html)

React 要素のイベント処理は、DOM 要素のイベント処理と似ているが、２つ違いがある：

- React イベントは小文字でなく camelCase になる。
- JSX では、イベントハンドラとして文字列でなく関数を渡す。
- React イベントハンドラでデフォルトの挙動をさせないために、`false` を返せない。明示的に `preventDefault()` を呼ばないといけない。

``` javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

``` javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

JavaScript では、クラスメソッドはデフォルトで `bind` されていないので、`this.handleClick` を `bind` しておかないと `this` は `undefined` になる。`bind` が面倒なら、次のような実験的な public class field 記法もできる（Create React App ではデフォルトで有効）：

``` javascript
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

関数にすると：
``` javascript
function Toggle(props) {
  const [toggled, setToggled] = React.useState(true);

  return (
    <button onClick={(_event) => setToggled(!toggled)}>
      {toggled ? 'ON' : 'OFF'}
    </button>
  );
}
```

## 7 [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)

React での条件付きレンダリングは、JavaScript での条件文・式と同じ。

``` javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>You have {unreadMessages.length} unread messages.</h2>}
    </div>
  );
}
```

コンポーネントが、ある条件のときレンダリングしたくない場合、`null` を返す：
``` javascript
function WarningBanner(props) {
  if (!props.warn) return null;

  return <div className="warning">Warning!</div>;
}
```

## 8 [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)

配列を `map` して、React 要素のリストを作ることができる：

``` javascript
function NumberList(props) {
  const listItems = proops.numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

どのアイテムが追加・変更・削除されるかを識別するために、要素のリストを作る際に特別な属性 `key` を使う。ID をキーに使うのがベスト。アイテムの順序が変わることがあるなら、アイテムのインデックスをキーに使うのはおすすめしない。`map()` 内の要素でキーが必要になる。配列の中のキーはユニークでなければならないが、グローバルにユニークである必要はない。

``` javascript
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

## 9 [Forms](https://reactjs.org/docs/forms.html)

`<input>`, `<textarea>`, `<select>` のようなフォーム要素は、自身の状態を持ち、入力に基づいて更新される。React では、可変な状態はコンポーネントの state プロパティ（またはフック）で扱われる。

フォームをレンダリングする React コンポーネントが、そのフォームの入力によって発生すること（イベントハンドリング）もコントロールする。このようなコンポーネントをコントロールド・コンポーネント (controlled component) という。フォーム上に表示される値は、必ず `value` 属性の値になる。

``` javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Note: ドキュメントにはないが、フックを使うと、
``` javascript
function NameForm(props) {
  const [value, setValue] = React.useState('');

  const handleSubmit = event => {
    alert('A name was submitted: ' + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={value} onChange={event => setTitle(event.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

`<select>` タグは、ルート `<select>` に `value` 属性を使う：

``` javascript
function FlavorForm(props) {
  const [value, setValue] = React.useState('coconut');

  function handleSubmit(event) {
    alert('Your favorite flavor is: ' + value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick you favorie flavor:
        <select value={value} onChange={event => setTitle(event.target.value)}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

ファイルインプットタグ `<input type="file">` の値はリードオンリーなので、アンコントロールド・コンポーネント (uncontrolled component) になる。詳細は https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag 。

[Formik](https://formik.org/) ライブラリは、バリデーションなども含めたフォームの機能を提供する。

## [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)

しばしば、複数のコンポーネントが同じ可変データを反映する必要がある。共有した状態を共通の祖先にまでリフトアップすることをすすめる。

``` javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return '';

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  return (
    <fieldset>
      <legend>Enter temeprature in {scaleNames[scale]}:</legend>
      <input value={temperature} onChange={e => onTemperatureChange(e.target.value)} />
    </fieldset>
  );
}

function Calculator(_props) {
  const [state, setState] = React.useState({ scale: 'c', temperature: '' });

  const celsius = state.scale === 'f' ? tryConvert(state.temperature, toCelsius) : state.temperature;
  const fahrenheit = state.scale === 'c' ? tryConvert(state.temperature, toFahrenheit) : state.temperature;

  return (
    <>
      <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={temperature => setState({ scale: 'c', temperature: temperature })} />
      <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={temperature => setState({ scale: 'f', temperature: temperature })} />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </>
  );
}
```

２つの `TemperatureInput` が同じ `temperature` を共有していてお互いに同期させたいため、上位の `Calculator` がそのステートを管理している。

## 11 [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)

React の継承とコンポジションについて。

包含させたければ、props の中にコンポーネントを含めて、それを内でレンダリングさせればよい：
``` javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />}right={<Chat />} />;
}
```

特殊化させたければ、汎用的なコンポーネントの props の値を指定して特殊化させればよい：
``` javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  );
}
```

Facebook では何千ものコンポーネントを使っているが、継承が必要なユースケースはなかった。

コンポーネント間で、非 UI の機能を再利用したければ、別モジュールに切り出す。

##  12 [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

次のような JSON API データがあるとして、これを表示する UI を作成する。(1) カテゴリ別に、商品の名前と価格と在庫の有無が一覧表示される。(2) 検索用の入力フォームがあって、入力するごとに動的に一覧表示が更新される。(3) 在庫のみのチェックボックスがあって、チェックすると在庫ありの商品のみが表示される。

``` javascript
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
```

### Step 1: UI をコンポーネント階層に分解する

まず、単一責任原則に従って、１つのコンポーネントは１つのことだけをするように分解する。

- `FilterableProductTable`: 全体の UI。
  - `SearchBar`: 検索用の入力フォームと、在庫のみのチェックボックス。
  - `ProductTable`: 入力に応じてフィルタリングして、データが一覧表示される。
    - `ProductCategoryRow`: カテゴリごとの見出し。
    - `ProductRow`: １つの商品（１行）。

## Step 2: 静的なバージョンを作る

次に、ステートを持たない静的なコンポーネントを作る。コード的には長いが、考えることはない。

``` javascript
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <p>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory)
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    rows.push(
      <ProductRow product={product} key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>}</td>
      <td>{product.price}</td>
    </tr>
  );
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

### Step 3: UI ステートの最小表現

UI をインタラクティブにするためには、可変なステートを使う必要がある。まずはアプリケーションにとって必要な最小のステートを考える。

このアプリケーションにある全データ：

- 元の商品のリスト。
- ユーザが入力した検索テキスト。
- チェックボックスの値。
- フィルタした商品のリスト。

どれがステートになるかを考えると：

1. それは props ごしに親から渡されるか？　もしそうなら、それは多分ステートでない。
2. それは時間を通して不変か？　もしそうなら、それは多分ステートでない。
3. それはほかのステートや props から計算できるか？　もしそうなら、それは多分ステートでない。

元の商品のリストは、props で渡されるので、ステートでない。検索テキストとチェックボックスの値は、時間を通して変わり、ほかの props やステートから計算もできないので、ステートだろう。フィルタした商品のリストは、ほかの３つのデータから求められるから、ステートでない。結果、ステートは検索テキストとチェックボックスの値となる。

``` javascript
function FilterableProductTable({ products }) {
  let [filterText] = React.useState('');
  let [inStockOnly] = React.useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} />
      <p>
        <input type="checkbox" checked={inStockOnly} />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

function ProductTable({ filterText, inStockOnly, products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) return;
    if (inStockOnly && !product.stocked) return;
    if (product.category !== lastCategory)
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    rows.push(
      <ProductRow product={product} key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
```

### Step 4: ステートがいるべきところ

- ステートに基づいてレンダリングするコンポーネントをすべて定める。
- その共通の親コンポーネントを見つける。
- 共通の親コンポーネントまたは別のコンポーネントが、ステートを持つべき。
- ステートを持って違和感のないコンポーネントが見つからなければ、ステートを持つためだけのコンポーネントを新たに作って、共通の親コンポーネントの上に付ける。

この戦略に従うと：

- `ProductTable` はステートに基づいて商品リストをフィルタする必要があり、`SearchBar` は検索テキストとチェック状態を表示する必要がある。
- 共通の親コンポーネントは、`FilterableProductTable` である。
- `FilterableProductTable` は検索テキストとチェック値がいて、違和感はない。

### Step 5: 逆データフローを追加する

``` javascript
function FilterableProductTable({ products }) {
  let [filterText, setFilterText] = React.useState('');
  let [inStockOnly, setInStockOnly] = React.useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockChange={setInStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockChange }) {
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} onChange={e => onFilterTextChange(e.target.value)} />
      <p>
        <input type="checkbox" checked={inStockOnly} onChange={e => onInStockChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

function ProductTable({ filterText, inStockOnly, products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) return ;
    if (inStockOnly && !product.stocked) return;
    if (product.category !== lastCategory)
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    rows.push(
      <ProductRow product={product} key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

# Advanced Guides

## [Context](https://reactjs.org/docs/context.html)

コンテキストは、データをコンポーネントツリーに渡すとき、毎回 props で渡さなくてすむようにするための機構。

React ではデータは props で親から子へ渡すのが普通だが、ロケール設定や UI テーマのような多くのコンポーネントで使われる props は煩雑になる。コンテキストは、props で渡さずにコンポーネント間でデータを共有することができる。

``` javascript
// Context オブジェクトを作る。
const ThemeContext = React.createContext({ foreground: "#000000", background: "#eeeeee" }); // default value

// コンテキストを用意する。
function App() {
  return (
    <ThemeContext.Provider value={{ foreground: "#ffffff", background: "#222222" }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // コンテキストを使う。
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>Button</button>
  );
}
```

間の階層で props を渡すのを避けたいだけなら、[コンポーネント・コンポジション](https://reactjs.org/docs/composition-vs-inheritance.html)の方がシンプルな解決法である。最上位コンポーネントが、データを扱う子孫コンポーネント自体を中間コンポーネントに渡すことで、中間コンポーネントがデータを扱わなくてすむようにする：

``` javascript
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

## [Fragments](https://reactjs.org/docs/fragments.html)

React では、複数の要素を返すことがよくある。フラグメントを使うことで、DOM に余分なノードを追加せずに、要素のリストをグループ化することができる。

``` javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

短縮記法 `<>...</>` でも書ける。

## [Higher-Order Componentse](https://reactjs.org/docs/higher-order-components.html)

高階コンポーネント (higher-order component, HOC) は、コンポーネントロジックを再利用するテクニックで、コンポーネントを受け取って新しいコンポーネントを返す関数である。

``` javascript
function CommentList() {
  const [comments, setComments] = React.useState(DataSource.getComments()); // Note: 初期値と useEffect とで二重に取得しているのはおかしい気がする。
  const listener = () => setComments(DataSource.getComments());

  React.useEffect(() => {
    DataSource.addChangeListener(listener);
    return () => DataSource.removeChangeListener(listener);
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

function BlogPost({ id }) {
  const [blogPost, setBlogPost] = React.useState(DataSource.getBlogPost(id)); // Note: 初期値と useEffect とで二重に取得しているのはおかしい気がする。
  const listener = () => setBlogPost(DataSource.getBlogPost(id));

  React.useEffect(() => {
    DataSource.addChangeListener(listener);
    return () => DataSource.removeChangeListener(listener);
  }, []);

  return (
    <TextBlock text={blogPost} />
  );
}
```

`CommentList` と `BlogPost` はどちらも同じような構造を持っているので、共通化したい：

``` javascript
function withSubscription(WrappedComponent, selectData) {
  return (props) => {
    const [data, setData] = useState(selectData(DataSource, props));
    const listener = () => setData(selectData(DataSource, props));

    React.useEffect(() => {
      DataSource.addChangeListener(listener);
      return () => DataSource.removeChangeListener(listener);
    }, []);

    return <WrappedComponent data={data} {...props} />;
  };
}

const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments());
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id));
```

## [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)

次の JSX は：
``` javascript
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

次の JS コードにコンパイルされる：
``` javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

React 要素型の指定：
- React はスコープ内にインポートされていなければならない。
- ドット記法で React コンポーネントを参照することもできる。`<MyComponents.DatePicker color="blue" />`
- ユーザ定義のコンポーネントは、キャピタライズしなければならない。
- React コンポーネントを実行時に選ぶ場合、最初にキャピタライズした変数に代入する。`const SpecificStory = components[props.storyType]; return <SpecificStory story={props.story} />;`

JSX の props:
- props の値に JavaScript 式 `{...}` を書くと、その結果が使われる。`<MyComponent foo={1 + 2 + 3 + 4} />`
- props の値に文字列リテラル `"..."` を書くことができる。このとき HTML アンエスケープされる。`<MyComponent message="hello world" />`
- props の値がないときは `true` 値になる。`<MyTextBox autocomplete />`
- props にオブジェクトを `...` 前置演算子付きで渡すことができる。`const props = {firstName: 'Ben', lastName: 'Hector'}; return <Greeting {...props} />;`

JSX の子：
- 子に文字列を置くと、`props.children` はその文字列になる。`<MyComponent>Hello world!</MyComponent>`
- 子に JSX を置くこともできる。
- 子に JavaScript 式 `{...}` を置くと、その結果が使われる。任意長の JSX 式のリストをレンダリングすることができる。`<ul>{todos.map((message) => <Item key={message} message={message} />)}</ul>`
- 子に `true`, `false`, `null`, `undefined` を置くと、何もないのと同じ。

## [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)

React アプリケーションの性能を最適化するための方法。

- プロダクションビルドを使う。
- Chrome パフォーマンスタブで、コンポーネントをプロファイルする。
- DevTools Profiler で、コンポーネントをプロファイルする。
- 長いリストを仮想化する。[react-window](https://react-window.now.sh/) 等を参照。
- reconciliation を避ける。

# Hooks

## 1. [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)

フックは React 16.8 で追加され、クラスなしでステートやその他の機能を使うことができる。フックはオプトインの機能で、互換性も保たれる。

``` javascript
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- フックは、コンポーネント階層を変えないまま、ステートフルなロジックを再利用することができる。6. Building Your Own Hooks を参照。
- フックは、`componentDidMount`, `componentWillUnmount` のようなライフサイクルメソッドに基づかなくなるので、関連するものごとにコンポーネントを分けることができる。4. Using the Effect Hook を参照。
- フックは、クラスを書く必要がなく、イベントハンドラを `bind` する必要もない。

## 2. [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

## 3. [Using the State Hook](https://reactjs.org/docs/hooks-state.html)

カウンターの例：

``` javascript
function Example() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 4. [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)

Effect Hook `useEffect()` は、 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` と同じ機能を提供する。`useEffect` を呼ぶと、DOM への変更があるたびに（レンダーするたびに）引数のエフェクト関数が呼ばれる。オプショナルな返り値の関数は、アンマウントしたときと次の再レンダーが行われる前に呼ばれるクリーンアップ用の関数。

``` javascript
function FriendStatus(props) {
  const [isOnline, setIsOnline] = React.useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

`useEffect()` のオプショナルな第２引数には、指定した props やステートの配列に変更があったときだけエフェクト関数が実行される。１度だけ（マウントとアンマウントのときだけ）実行させたければ、第２引数は `[]` にすればよい。

## 5. [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)

フックは２つのルールがある：

- フックはトップレベルからのみ呼び出せる。ループ、条件、ネスト関数の中で呼んではいけない。
- フックは React 関数コンポーネントからのみ呼び出せる。

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) を使えば、これらのルールに従っていることをチェックできる。

## 6. [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

カスタムフックは `use` から始まる名前の JavaScript 関数で、ほかの Hooks を呼んでいるようなものである。

``` javascript
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = React.useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => { ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange); };
  });

  return isOnline;
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```
