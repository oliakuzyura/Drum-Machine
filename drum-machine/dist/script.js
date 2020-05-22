const buttons = [
{
  keyButton: 'Q',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  keyCode: 81,
  name: 'Heater-1' },

{
  keyButton: 'W',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  keyCode: 87,
  name: 'Heater-2' },

{
  keyButton: 'E',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  keyCode: 69,
  name: 'Heater-3' },

{
  keyButton: 'A',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  keyCode: 65,
  name: 'Heater-4' },

{
  keyButton: 'S',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  keyCode: 83,
  name: 'Heater-6' },

{
  keyButton: 'D',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  keyCode: 68,
  name: 'Dsc_Oh' },

{
  keyButton: 'Z',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  keyCode: 90,
  name: 'Kick_n_Hat' },

{
  keyButton: 'X',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  keyCode: 88,
  name: 'RP4_KICK' },

{
  keyButton: 'C',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  keyCode: 67,
  name: 'Cev_H2' }];



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      power: true,
      volume: 0.1 };

    this.displayName = this.displayName.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  handleVolume(e) {
    this.setState({
      volume: e.target.value });

  }

  displayName(name) {
    this.setState({
      display: name });

  }

  handlePower() {
    if (this.state.power == true) {
      this.setState({
        power: false,
        display: '' });

    } else
    {
      this.setState({
        power: true });

    }
  }

  render() {
    const powerLeft = 'power-left';
    const powerRight = 'power-right';
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement(DrumButtons, { volume: this.state.volume, power: this.state.power, displayName: this.displayName }),
      React.createElement("div", { class: "tools" },
      React.createElement("p", { id: "textPower" }, React.createElement("strong", null, "Power")),
      React.createElement("div", { id: "power", onClick: this.handlePower },
      React.createElement("div", { id: this.state.power ? powerLeft : powerRight }),
      React.createElement("div", { id: this.state.power ? powerRight : powerLeft })),

      React.createElement("p", { id: "display" }, React.createElement("strong", null, this.state.display)),
      React.createElement("div", { id: "volume" },
      React.createElement("input", { type: "range", min: "0", max: "1", step: "0.01", value: this.state.volume, onChange: this.handleVolume })))));





  }}


class DrumButton extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  play() {
    if (this.props.power)
    {
      let audio = document.getElementById(this.props.keyButton);
      audio.volume = this.props.volume;
      audio.play();
      this.props.displayName(this.props.name);
    }
  }

  handleKeyPress(event) {
    if (event.keyCode == this.props.keyCode) {
      this.play();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  render() {

    return (
      React.createElement("div", null,
      React.createElement("div", { className: "drum-pad", onClick: this.play, id: this.props.name }, React.createElement("audio", { className: "clip", id: this.props.keyButton, src: this.props.url }), this.props.keyButton)));


  }}


class DrumButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let drumButtons;
    drumButtons = buttons.map(elem => {
      return (
        React.createElement(DrumButton, { volume: this.props.volume, power: this.props.power, keyButton: elem.keyButton,
          url: elem.url, keyCode: elem.keyCode, name: elem.name, displayName: this.props.displayName }));

    });

    return (
      React.createElement("div", { className: "buttonsGrid" },
      drumButtons));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));