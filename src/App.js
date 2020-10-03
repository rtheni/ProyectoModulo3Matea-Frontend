import React, { useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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

function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [songs, setSongs] = useState([]);

  const obtenerUsuarios = async () => {
    // obtiene los usuarios desde el backend
    var myHeaders = new Headers();

    var myInit = { method: 'GET',
                headers: myHeaders,
              mode: 'cors',
              cache: 'default' };
    let url = new URL("https://rt-mateify-app.herokuapp.com/users/");
    let response = await fetch(url, myInit);
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    // Esto se ejecuta al renderizar la pagina por primera vez
    obtenerUsuarios();
  }, []);

  const handleClick = async (e, usuario) => {
    e.preventDefault();
    console.log("Se hizo click en el usuario ", usuario);
    setSongs(usuario.favSongs);
  };

  return (
    <div className="App">
      <Card className="App-Cards-Container">
      <header className="App-header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="App-Header-Title">
            Mateify
          </Typography>
        </Toolbar>
      </AppBar>
      </header>
        
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
                      {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                        <TableRow key={usuario._id} onClick={(e) => handleClick(e, usuario)}>
                          <TableCell align="center">{usuario.name} {usuario.lastname} - {usuario.email} - {usuario.age}</TableCell>
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
                        <TableCell align="center">Canciones Favoritas</TableCell>
                      </TableRow>
                    </TableHead>
                      <TableBody>
                      {songs.length > 0 ? (
                        songs.map((song) => (
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
