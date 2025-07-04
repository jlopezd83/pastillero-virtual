import { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPromptInstall(e);
      setSupportsPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      setSupportsPWA(false);
      setIsInstalled(true);
    }
  };

  const handleDismiss = () => {
    setSupportsPWA(false);
  };

  if (!supportsPWA || isInstalled) {
    return null;
  }

  return (
    <div className="install-banner">
      <div className="install-content">
        <div className="install-icon">📱</div>
        <div className="install-text">
          <h4>Instalar Pastillero Virtual</h4>
          <p>Instala la app para acceder más rápido y usar sin conexión</p>
        </div>
        <div className="install-actions">
          <button onClick={handleInstallClick} className="btn-install">
            Instalar
          </button>
          <button onClick={handleDismiss} className="btn-dismiss">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA; 