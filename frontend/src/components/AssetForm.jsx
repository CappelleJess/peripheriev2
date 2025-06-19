import { useState } from 'react';

function AssetForm({ initialData = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    key: initialData.key || '',
    sprite: initialData.sprite || '',
    x: initialData.x || 0,
    y: initialData.y || 0,
    scale: initialData.scale || 1,
    choices: initialData.choices || {},
    type: initialData.type || 'interactive'
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
    <form onSubmit={handleSubmit} className="bg-[#1b1f3b] p-4 rounded mb-6 text-[#faf3e0]">
      <div className="mb-2">
        <label className="block">Nom (key)</label>
        <input type="text" name="key" value={formData.key} onChange={handleChange} className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]" required />
      </div>
      <div className="mb-2">
        <label className="block">Sprite</label>
        <input type="text" name="sprite" value={formData.sprite} onChange={handleChange} className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]" required />
      </div>
      <div className="mb-2">
        <label className="block">Position X</label>
        <input type="number" name="x" value={formData.x} onChange={handleChange} className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]" />
      </div>
      <div className="mb-2">
        <label className="block">Position Y</label>
        <input type="number" name="y" value={formData.y} onChange={handleChange} className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]" />
      </div>
      <div className="mb-2">
        <label className="block">Échelle</label>
        <input type="number" name="scale" step="0.1" value={formData.scale} onChange={handleChange} className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]" />
      </div>
      <div className="mb-2">
        <label className="block">Type d’objet</label>
        <select name="type" value={formData.type} onChange={handleChange} className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]">
          <option value="interactive">Interactif (avec choix)</option>
          <option value="extra">Extra (ambiance uniquement)</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Sauvegarder</button>
        <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Annuler</button>
      </div>
        {formData.type === 'interactive' && (
          <div className="border border-[#4a90e2] rounded p-3 bg-[#1b1f3b] mt-4">
            <h3 className="text-[#00ff9f] font-semibold mb-2">Choix disponibles (JSON)</h3>
            <textarea
              rows="5"
              name="choices"
              defaultValue={JSON.stringify(formData.choices, null, 2)}
              onBlur={handleChoicesChange}
              className="w-full text-black dark:text-[#faf3e0] bg-white dark:bg-[#2e2e2e]"
            ></textarea>
            <p className="text-xs text-[#d6c7ae] mt-1">
              Exemple : {"{\"examine\": {\"text\": \"...\", \"scores\": {\"souvenir\": 1}}}"}
            </p>
          </div>
        )}

        {formData.type === 'extra' && (
          <div className="border border-[#9b5de5] rounded p-3 bg-[#1b1f3b] mt-4">
            <h3 className="text-[#e60073] font-semibold mb-2">Message affiché</h3>
            <textarea
              rows="3"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full text-black"
            ></textarea>
          </div>
        )}
    </form>
  );
}

export default AssetForm;