import logo from './logo.svg';
import './App.css';
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";

function App() {
  const [state, setState] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    fsp: '',
    ppe: '',
    sensor: '',
    alertType: ''
  })

  // Dodać alert na typ (PPE, sensora) i moc umowną (i prawie przekroczoną)


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

          <InputLabel id="demo-simple-select-label">Wybierz grupę</InputLabel>
          <Select
                sx={{marginBottom: '20px',
                    width: '300px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.fsp}
            onChange={(e) => setState({...state, fsp: e.target.value})}
          >
            <MenuItem value={'ALL'}>Ustaw alert na całą gminę</MenuItem>
            <MenuItem value={'SCHOOL'}>Szkoły</MenuItem>
            <MenuItem value={'GOV'}>Urzędy</MenuItem>
          </Select>

          <InputLabel id="demo-simple-select-label">Wybierz PPE</InputLabel>
          <Select
                sx={{marginBottom: '20px',
                    width: '300px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.ppe}
                disabled={!state.fsp || state.fsp === 'ALL'}
            onChange={(e) => setState({...state, ppe: e.target.value})}
          >
            <MenuItem value={'ALL'}>Alert na całą grupę</MenuItem>
            {state.fsp === 'SCHOOL' ? <MenuItem value={'SP21'}>SP 21</MenuItem> : <MenuItem value={'UM'}>Urząd Miasta</MenuItem>}
            {state.fsp === 'SCHOOL' ? <MenuItem value={'SP22'}>SP 22</MenuItem> : <MenuItem value={'UG'}>Urząd Gminy</MenuItem>}
              }

          </Select>

          <InputLabel id="demo-simple-select-label">Wybierz sensor</InputLabel>
          <Select
                sx={{marginBottom: '40px',
                    width: '300px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.sensor}
                disabled={!state.ppe || state.ppe === 'ALL'}
            onChange={(e) => setState({...state, sensor: e.target.value})}
          >
            <MenuItem value={'ALL'}>Alert na cały punkt</MenuItem>
            <MenuItem value={'DUMB'}>Stary licznik w {state.ppe}</MenuItem>
            <MenuItem value={'SMART'}>Smart licznik w {state.ppe}</MenuItem>
            <MenuItem value={'PV'}>PV w {state.ppe}</MenuItem>
          </Select>


        <Box sx={{marginBottom: '20px'}}>Ustaw alert na:
                    <Select
                sx={{minWidth: '150px', marginLeft: '20px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.alertType}
                disabled={!state.sensor && !(state.ppe === 'ALL') && !(state.fsp === 'ALL')}
            onChange={(e) => setState({...state, alertType: e.target.value})}
          >
                      <MenuItem value={'READINGS'}>Odczyty</MenuItem>
                      {state.sensor === 'ALL' && <MenuItem value={'PPE_STATUS'}>Zmiana statusu PPE</MenuItem>}
                      {/*{state.sensor && state.sensor !== 'ALL' && <MenuItem value={'SENSOR_STATUS'}>Status sensora</MenuItem>}*/}
                      {state.sensor === 'ALL' && <MenuItem value={'CONTRACTED_PWR'}>Przekroczoną moc umowna PPE</MenuItem>}
                      {state.sensor === 'ALL' && <MenuItem value={'NEAR_CONTRACTED_PWR'}>Moc PPE bliską umownej</MenuItem>}
          </Select>
        </Box>

        {state.alertType === 'READINGS' &&

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <Select
                  sx={{minWidth: '150px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.first}
                  disabled={!state.sensor && !(state.ppe === 'ALL') && !(state.fsp === 'ALL')}
                  onChange={(e) => setState({...state, first: e.target.value})}
              >
                <MenuItem value={'up'}>Wzrost</MenuItem>
                <MenuItem value={'down'}>Spadek</MenuItem>
              </Select>

              <Select
                  sx={{minWidth: '150px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.second}
                  disabled={!state.first}
                  onChange={(e) => setState({...state, second: e.target.value})}
              >
                <MenuItem value={'power'}>średniej mocy</MenuItem>
                <MenuItem value={'energy'}>sumy energii</MenuItem>
              </Select>

              <Select
                  sx={{minWidth: '150px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.third}
                  disabled={!state.second}
                  onChange={(e) => setState({...state, third: e.target.value})}
              >
                {state.sensor !== 'PV' &&
                    <MenuItem value={'used'}>{state.second === 'power' ? 'zużycia' : 'zużytej'}</MenuItem>}
                {(state.sensor === 'SMART' || state.sensor === 'ALL') &&
                    <MenuItem value={'imported'}>{state.second === 'power' ? 'importu' : 'zaimportowanej'}</MenuItem>}
                {(state.sensor === 'SMART' || state.sensor === 'ALL') &&
                    <MenuItem value={'exported'}>{state.second === 'power' ? 'exportu ' : 'wyeksportowanej'}</MenuItem>}
                {(state.sensor === 'SMART' || state.sensor === 'ALL') && <MenuItem
                    value={'autoconsumed'}>{state.second === 'power' ? 'autokonsumpcji' : 'zautokonsumowanej'}</MenuItem>}
                {(state.sensor === 'PV' || state.sensor === 'ALL') &&
                    <MenuItem value={'generated'}>{state.second === 'power' ? 'generacji' : 'wygenerowanej'}</MenuItem>}
              </Select>

              <Select
                  sx={{minWidth: '150px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.fourth}
                  disabled={!state.third}
                  onChange={(e) => setState({...state, fourth: e.target.value})}
              >
                <MenuItem value={'no-diff'}>{state.first === 'up' ? 'powyżej' : 'poniżej'}</MenuItem>
                <MenuItem value={'diff'}>o</MenuItem>
              </Select>

              <TextField sx={{width: '100px'}}
                         id="outlined-basic"
                         variant="outlined"
                         disabled={!state.fourth}
                         value={state.fifth}
                         type="number"
                         onChange={(e) => setState({...state, fifth: e.target.value})}
              />

              <Select
                  sx={{minWidth: '150px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.sixth}
                  disabled={!state.fifth}
                  onChange={(e) => setState({...state, sixth: e.target.value})}
              >
                <MenuItem value={'watts'}>{state.second === 'power' ? 'kW' : 'kWh'}</MenuItem>
                {state.fourth === 'diff' && <MenuItem value={'percent'}>%</MenuItem>}
              </Select>

            </Box>
        }
      </header>
    </div>
  );
}

export default App;
