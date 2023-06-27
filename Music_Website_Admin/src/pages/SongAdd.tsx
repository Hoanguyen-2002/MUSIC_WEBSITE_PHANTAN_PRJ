import React, { useState } from "react";

type SongData = {
  key: string;
  name: string;
  artist: string;
  block: string;
  gerne: string;
};

type SongFormProps = {
  onSubmit: (song: SongData) => void;
};

const SongForm: React.FC<SongFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SongData>({
    key: "",
    name: "",
    artist: "",
    block: "",
    gerne: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      key: "",
      name: "",
      artist: "",
      block: "",
      gerne: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="key">Key:</label>
        <input
          type="text"
          id="key"
          value={formData.key}
          onChange={(event) =>
            setFormData({ ...formData, key: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          value={formData.artist}
          onChange={(event) =>
            setFormData({ ...formData, artist: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="block">Block:</label>
        <input
          type="text"
          id="block"
          value={formData.block}
          onChange={(event) =>
            setFormData({ ...formData, block: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="gerne">Genre:</label>
        <input
          type="text"
          id="gerne"
          value={formData.gerne}
          onChange={(event) =>
            setFormData({ ...formData, gerne: event.target.value })
          }
        />
      </div>
      <button type="submit">Add Song</button>
    </form>
  );
};

export default SongForm;