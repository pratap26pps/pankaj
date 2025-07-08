'use client';
import React from 'react';

export default function DummyPackagePage({ service }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h2 className="text-2xl font-bold mb-2 text-green-700">You selected: {service.name}</h2>
      <p className="text-gray-600">
        This is a dummy package page for <strong>{service.name}</strong>.
        You can replace this later with actual package info.
      </p>
    </div>
  );
}
