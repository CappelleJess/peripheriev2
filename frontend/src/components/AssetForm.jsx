import { useState } from 'react';

function AssetForm({ initialData = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    key: initialData.key || '',
    sprite: initialData.sprite || '',
    x: initialData.x || 0,
    y: initialData.y || 0,
    scale: initialData.scale || 1,
    choices: initialData.choices || {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChoicesChange = (e) => {
    try {
      const value = JSON.parse(e.target.value);
      setFormData({ ...formData, choices: value });
    } catch (err) {
      alert('Format JSON invalide pour choices');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#2e2e2e] p-4 rounded mb-6">
      <div className="mb-2">
        <label className="block">Nom (key)</label>
        <input type="text" name="key" value={formData.key} onChange={handleChange} className="w-full text-black" required />
      </div>
      <div className="mb-2">
        <label className="block">Sprite</label>
        <input type="text" name="sprite" value={formData.sprite} onChange={handleChange} className="w-full text-black" required />
      </div>
      <div className="mb-2">
        <label className="block">Position X</label>
        <input type="number" name="x" value={formData.x} onChange={handleChange} className="w-full text-black" />
      </div>
      <div className="mb-2">
        <label className="block">Position Y</label>
        <input type="number" name="y" value={formData.y} onChange={handleChange} className="w-full text-black" />
      </div>
      <div className="mb-2">
        <label className="block">Échelle</label>
        <input type="number" name="scale" step="0.1" value={formData.scale} onChange={handleChange} className="w-full text-black" />
      </div>
      <div className="mb-2">
        <label className="block">Choices (JSON)</label>
        <textarea
          rows="5"
          name="choices"
          defaultValue={JSON.stringify(formData.choices, null, 2)}
          onBlur={handleChoicesChange}
          className="w-full font-mono text-sm text-black"
        ></textarea>
        <p className="text-xs">Exemple : {`{"examiner": {"text": "...", "scores": {"souvenir": 1}}}`}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Sauvegarder</button>
        <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Annuler</button>
      </div>
    </form>
  );
}

export default AssetForm;