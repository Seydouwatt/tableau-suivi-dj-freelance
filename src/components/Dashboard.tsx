import { useEffect, useState } from "react";

import { API_BASE_URL } from "../config";

type EventType = {
  id: string;
  title: string;
  date: string;
  location: string;
  type?: "DJ" | "Dev";
  status?: "Prévu" | "Terminé" | "Annulé";
};

const Dashboard = () => {
  const [events, setEvents] = useState([] as EventType[]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"DJ" | "Dev">("DJ");
  const [status, setStatus] = useState<"Prévu" | "Terminé" | "Annulé">("Prévu");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) =>
        console.error("Erreur de récupération des événements:", error)
      );
  }, []);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const newEvent = { title, date, location };

  //     const res = await fetch(`${API_BASE_URL}/events`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newEvent),
  //     });

  //     const data = await res.json();
  //     setEvents((prev) => [...prev, data]);

  //     // Reset formulaire
  //     setTitle("");
  //     setDate("");
  //     setLocation("");
  //   };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:4000/api/events/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEdit = (event: EventType) => {
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setType(event.type || "DJ");
    setStatus(event.status || "Prévu");
    setEditingId(event.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = { title, date, location, type, status };

    if (editingId) {
      const res = await fetch(`http://localhost:4000/api/events/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const updated = await res.json();
      setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      setEditingId(null);
    } else {
      const res = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      setEvents((prev) => [...prev, data]);
    }

    setTitle("");
    setDate("");
    setLocation("");
    setType("DJ");
    setStatus("Prévu");
  };
  return (
    <div className="dashboard">
      <h1>Bienvenue sur ton Dashboard !</h1>
      <section>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Evénements à venir</h2>
          <ul className="space-y-2">
            {events.map((event: any) => (
              <li key={event.id}>
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl">{event.title}</h2>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p> {event.location}</p>
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
            <h2 className="text-xl font-semibold">Ajouter un événement</h2>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border rounded p-2"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Lieu"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full border rounded p-2"
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "DJ" | "Dev")}
              className="block w-full border rounded p-2"
            >
              <option value="DJ">DJ</option>
              <option value="Dev">Dev</option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Prévu" | "Terminé" | "Annulé")
              }
              className="block w-full border rounded p-2"
            >
              <option value="Prévu">Prévu</option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
