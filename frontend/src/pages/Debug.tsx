import React, { useEffect, useState } from "react";
import "../styles/Debug.css"; // Importer les styles pour la page Debug

const Debug: React.FC = () => {
  const [storageData, setStorageData] = useState<{ [key: string]: string }>({});

  // Lire les variables du localStorage et les stocker dans l'état
  useEffect(() => {
    const data: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key) || "";
      }
    }
    setStorageData(data);
  }, []);

  return (
    <div className="debug-container">
      <h1 className="debug-title">Variables du localStorage</h1>
      <table className="debug-table">
        <thead>
          <tr>
            <th>Clé</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(storageData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Debug;
