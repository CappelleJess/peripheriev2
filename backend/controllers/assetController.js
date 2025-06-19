import Asset from '../models/Assets.js';

// POST /api/assets
export const createAsset = async (req, res) => {
  try {
    console.log("Requête reçue :", req.body);
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (error) {
    console.error('Erreur création asset :', error.message);
    res.status(500).json({ message: "Échec de création d'asset" });
  }
};

// GET /api/assets
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Erreur récupération assets :', error);
    res.status(500).json({ message: "Échec de récupération des assets" });
  }
};

// PUT /api/assets/:id
export const updateAsset = async (req, res) => {
  try {
    const updated = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Asset non trouvé' });
    res.status(200).json(updated);
  } catch (error) {
    console.error('Erreur mise à jour asset :', error);
    res.status(500).json({ message: "Échec de la mise à jour" });
  }
};

// DELETE /api/assets/:id
export const deleteAsset = async (req, res) => {
  try {
    const deleted = await Asset.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Asset non trouvé' });
    res.status(200).json({ message: 'Asset supprimé' });
  } catch (error) {
    console.error('Erreur suppression asset :', error);
    res.status(500).json({ message: "Échec de suppression" });
  }
};