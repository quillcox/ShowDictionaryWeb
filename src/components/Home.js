import React, {Component} from 'react';
import firebase from '../util/firebase';
import ShowIcon from './ShowIcon';
import {Link} from 'react-router-dom';
import {strip} from '../util/helper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isWaitingShowLoad: true,
      // isDisplayingShowInfo: false,
      // chosenShow: '',
      // chosenShowInfo: [],
      // redirect: false,
      shows: [],
    };
    this.updateApp = props.updateApp;
    document.title = 'Show Dictionary';
  }

  render() {
    return (
      <div className='ShowDictionary'>
        {
          this.state.shows.map((show, index) =>
            <Link
              key={index}
              to={{
                pathname: '/' + strip(show.showname),//encodeURIComponent(this.state.shows[index].showname).replace(/%20/g, '+'),
              }}
            >
              <ShowIcon
                key={index}
                name={show.showname}
                stripped={strip(show.showname)}
                titleCard={show.titleCard}
                // onClick={() => {
                // this.loadShowInformation(this.state.shows[index].showname).then((info) => {
                // this.setState({
                //   chosenShow: this.state.shows[index].showname,
                //   chosenShowInfo: info,
                // redirect: true,
                // isDisplayingShowInfo: true,
                // });
                // this.updateApp(this.state.shows[index].showname);
                // });
                //}}
              />
            </Link>
          )
        }
      </div>
    );
  }

  componentDidMount() {
    this.getShows().then((shows) => {
      // this.setState({isWaitingShowLoad: false});
      Object.keys(shows.map((key, index) => (
        this.setState({
          shows: this.state.shows.concat(key)
        })
      )));
    })
  }

  async getShows() {
    const snapshot = await firebase.database().ref().child('shows').once('value');

    const data = [];
    snapshot.forEach(child => {
      const showname = child.val()['Name'];
      const titleCard = child.val()['URL'];

      data.push({showname, titleCard})
    });
    return data;
  }

  // async loadShowInformation(showname) {
  //   const snapshot = await firebase.database().ref(this.strip(showname)).once('value');
  //
  //   const data = [];
  //   snapshot.forEach(child => {
  //     // console.log(child.val());
  //     const episode = {
  //       code: child.val()['Code'],
  //       name: child.val()['Name'],
  //       airdate: child.val()['Airdate'],
  //       writer: child.val()['Writer'],
  //       summary: child.val()['Summary'],
  //       location: child.val()['Location'],
  //     };
  //
  //     data.push(episode);
  //   });
  //   return data;
  // }
  //
  // noinspection JSMethodCanBeStatic
  // strip(showname) {
  //   showname = showname.toString().toLowerCase().split(' ').join('');
  //   showname = showname.split(':').join('');
  //   showname = showname.split(''').join('');
  //   return showname;
  // }
}

export default Home;