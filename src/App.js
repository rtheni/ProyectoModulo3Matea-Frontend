import React, { useState, useEffect} from 'react';

import Header from './components/header'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './App.css';
import './styles/header.css';
import './styles/table.css';

function App() {

  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchUsers = async () => {
    var myHeaders = new Headers();
    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };
    let url = new URL("https://rt-mateify-app.herokuapp.com/users/");
    let response = await fetch(url, myInit);
    const userList = await response.json();
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = async (e, user) => {
    e.preventDefault();
    setSongs(user.favSongs);
  };

  return (
    <div className="App">
      <Card className="App-Cards-Container">
      <Header/>
        <CardContent className="App-Cards-ContainerContent">
          
          <Card variant="outlined" className="App-UserCard">
            <CardContent className="App-UserCardContent">
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center">Usuarios</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? (users.map((user) => (
                      <TableRow key={user._id} onClick={(e) => handleClick(e, user)}>
                        <TableCell align="center">{user.name} {user.lastname} - {user.email} - {user.age}</TableCell>
                      </TableRow>
                    ))
                    ) : (
                      <p>Cargando...</p>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            </Card>
            <Card variant="outlined" className="App-SongCard">
              <CardContent className="App-SongCardContent">
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow >
                        <TableCell align="center">Canciónes Favorítas</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {songs.length > 0 ? (songs.map((song) => (
                        <TableRow key={song._id}>
                          <TableCell align="center">{song.name} de {song.artist} - Artista: {song.artist} - Duración: {song.duration}</TableCell>
                        </TableRow>
                      ))
                      ) : (
                        <p>Sin canciónes favorítas</p>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
