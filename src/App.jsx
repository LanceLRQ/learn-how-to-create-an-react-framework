import React from './kreact/kreact';
const Comp1 = (props) => {
  return <div className="comp1">
    我是函数组件 {props.name}
  </div>
};

class Comp2 extends React.Component {
  render() {
    return <div className="comp1">
      <ul>
        <li>我是类组件1 {this.props.name}</li>
        <li>我是类组件2 {this.props.name}</li>
        <li>我是类组件3 {this.props.name}</li>
      </ul>
    </div>
  }
}

function App(props) {
  return (
    <section className="App">
      <header>我是Title</header>
      <main>我是main</main>
      <Comp1 name="123" />
      <Comp2 name="456" />
      <React.Fragment>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </React.Fragment>
      <footer>
        &copy; <a href="https://github.com/facebook/react">kReact</a>
      </footer>
    </section>
  );
}

export default App;
