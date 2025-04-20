import React, { useState } from "react";

interface AddEventFormProps {
  addEvent: (event: { title: string; date: string; type: string }) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ addEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date && type) {
      addEvent({ title, date, type });
      setTitle("");
      setDate("");
      setType("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Type</option>
          <option value="DJ Event">DJ Event</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">
        Add Event
      </button>
    </form>
  );
};

export default AddEventForm;
