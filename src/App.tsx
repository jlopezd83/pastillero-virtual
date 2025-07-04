import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Resumen from './pages/Resumen';
import AgregarMedicamento from './pages/AgregarMedicamento';
import EditarMedicamento from './pages/EditarMedicamento';
import Historial from './pages/Historial';
import type { Medicamento, RegistroMedicamento } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [medicamentos, setMedicamentos] = useLocalStorage<Medicamento[]>('medicamentos', []);
  const [registros, setRegistros] = useLocalStorage<RegistroMedicamento[]>('registros', []);

  // Limpiar localStorage si hay datos corruptos
  useEffect(() => {
    if (!Array.isArray(medicamentos)) {
      setMedicamentos([]);
    }
    if (!Array.isArray(registros)) {
      setRegistros([]);
    }
  }, [medicamentos, registros, setMedicamentos, setRegistros]);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  medicamentos={medicamentos}
                  registros={registros}
                  setRegistros={setRegistros}
                />
              } 
            />
            <Route 
              path="/resumen" 
              element={
                <Resumen 
                  medicamentos={medicamentos}
                  setMedicamentos={setMedicamentos}
                />
              } 
            />
            <Route 
              path="/agregar" 
              element={
                <AgregarMedicamento 
                  medicamentos={medicamentos}
                  setMedicamentos={setMedicamentos}
                />
              } 
            />
            <Route 
              path="/editar/:id" 
              element={
                <EditarMedicamento 
                  medicamentos={medicamentos}
                  setMedicamentos={setMedicamentos}
                />
              } 
            />
            <Route 
              path="/historial" 
              element={
                <Historial 
                  medicamentos={medicamentos}
                  registros={registros}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
