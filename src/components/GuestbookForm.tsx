"use client";

import React, { useEffect, useState } from "react";

type Entry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function GuestbookForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("guestbook.entries");
      if (raw) setEntries(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load guestbook entries", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("guestbook.entries", JSON.stringify(entries));
    } catch (e) {
      console.error("Failed to save guestbook entries", e);
    }
  }, [entries]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const entry: Entry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    setEntries((s) => [entry, ...s]);
    setName("");
    setMessage("");
  }

  function handleClear() {
    setEntries([]);
  }

  return (
    <div className="guestbook">
      <form onSubmit={handleSubmit} className="guestbook-form">
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 남겨주세요"
            className="textarea"
            rows={4}
          />
        </div>

        <div className="buttons">
          <button type="submit" className="btn">
            남기기
          </button>
          <button type="button" onClick={handleClear} className="btn btn-secondary">
            전체삭제
          </button>
        </div>
      </form>

      <section className="entries">
        <h3>방명록</h3>
        {entries.length === 0 ? (
          <p>아직 남긴 글이 없습니다.</p>
        ) : (
          <ul>
            {entries.map((e) => (
              <li key={e.id} className="entry">
                <div className="entry-header">
                  <strong>{e.name}</strong>
                  <span className="time">{new Date(e.createdAt).toLocaleString()}</span>
                </div>
                <p className="entry-message">{e.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <style jsx>{`
        .guestbook { max-width: 640px; margin: 0 auto; }
        .guestbook-form { display: grid; gap: 8px; margin-bottom: 16px; }
        .input, .textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .buttons { display: flex; gap: 8px; }
        .btn { padding: 8px 12px; background: #111827; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .btn-secondary { background: #6b7280; }
        .entries ul { list-style: none; padding: 0; }
        .entry { border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; margin-bottom: 8px; }
        .entry-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .entry-message { white-space: pre-wrap; }
      `}</style>
    </div>
  );
}
