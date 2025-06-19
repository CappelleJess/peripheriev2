import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import AssetTable from '../components/AssetTable';
import AssetForm from '../components/AssetForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [ongletActif, setOngletActif] = useState('interactive');
  const filteredAssets = assets.filter((a) => a.type === ongletActif);

  useEffect(() => {
  console.log("useEffect lancé – tentative de fetch des assets");
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

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet asset ?')) return;
    try {
      await api.delete(`/assets/${id}`);
      toast.success("Asset supprimé avec succès !");
      console.log(`Asset ${id} supprimé`);
      fetchAssets();
    } catch (err) {
      console.error('Erreur suppression :', err);
      toast.error(err.response?.data?.message || "Erreur lors de la suppression de l’asset.");
    }
  };

  const handleSave = async (assetData) => {
    try {
      if (editingAsset) {
        await api.put(`/assets/${editingAsset._id}`, assetData);
        toast.success("Asset modifié avec succès !");
      } else {
        await api.post('/assets', assetData);
        toast.success("Asset ajouté avec succès !");
      }
      setShowForm(false);
      setEditingAsset(null);
      fetchAssets();
    } catch (err) {
      console.error('Erreur sauvegarde :', err);
      toast.error(err.response?.data?.message || "Échec lors de la sauvegarde de l’asset.");
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="p-4 text-white">Accès refusé</div>;
  }

  return (
    <div className="bg-[#1b1f3b] text-white min-h-screen p-4">
      <h1 className="text-2xl mb-4">Tableau de bord - Administration des assets</h1>

      <div className="fenetre-retro-tabs">
        <button
          onClick={() => setOngletActif('interactive')}
          className={`fenetre-retro-tab ${ongletActif === 'interactive' ? 'active' : ''}`}
        >
          Objets Interactifs
        </button>
        <button
          onClick={() => setOngletActif('extra')}
          className={`fenetre-retro-tab ${ongletActif === 'extra' ? 'active' : ''}`}
        >
          Objets d’Ambiance
        </button>
      </div>

      {!showForm && (
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mb-4"
          onClick={() => {
            setEditingAsset(null);
            setShowForm(true);
          }}
        >
          Ajouter un asset
        </button>
      )}

      {showForm && (
        <AssetForm
          initialData={editingAsset || { type: ongletActif }}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingAsset(null);
          }}
        />
      )}

      {!showForm && (
        <AssetTable assets={filteredAssets} onEdit={handleEdit} onDelete={handleDelete} />
      )}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="dark" />
    </div>
  );
}

export default AdminDashboard;