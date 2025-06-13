import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import AssetTable from '../components/AssetTable';
import AssetForm from '../components/AssetForm';

function AdminDashboard() {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null);
  const [showForm, setShowForm] = useState(false);

  console.log("AdminDashboard chargé !");

  // Chargement initial des assets
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/assets');
      setAssets(res.data);
    } catch (err) {
      console.error('Erreur chargement assets :', err);
    }
  };

  // Vérifie que l'utilisateur est bien admin
  if (user === null) {
    return <div className="p-4 text-white">Chargement...</div>; // ou spinner
  }

  if (user.role !== 'admin') {
    return <div className="p-4 text-white">Accès refusé</div>;
  }

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet asset ?')) return;
    try {
      await api.delete(`/assets/${id}`);
      fetchAssets();
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  };

  const handleSave = async (assetData) => {
    try {
      if (editingAsset) {
        await api.put(`/assets/${editingAsset._id}`, assetData);
      } else {
        await api.post('/assets', assetData);
      }
      setShowForm(false);
      setEditingAsset(null);
      fetchAssets();
    } catch (err) {
      console.error('Erreur sauvegarde :', err);
    }
  };

  return (
    <div className="bg-[#1b1f3b] text-white min-h-screen p-4">
      <h1 className="text-2xl mb-4">Tableau de bord - Administration des assets</h1>

      {!showForm && (
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(true)}>
          Ajouter un asset
        </button>
      )}

      {showForm && (
        <AssetForm
          initialData={editingAsset || {}}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingAsset(null);
          }}
        />
      )}

      <AssetTable assets={assets} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default AdminDashboard;
