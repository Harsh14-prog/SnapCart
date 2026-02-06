"use client";

import { getSocket } from "@/lib/socket";
import { useEffect } from "react";

function GeoUpdater({ userId }: { userId: string }) {
  useEffect(() => {
    if (!userId) return;
    if (!navigator.geolocation) return;

    const socket = getSocket();

    const onConnect = () => {
      console.log("🌍 socket connected:", socket.id);
      console.log("📤 emitting identity:", userId);

      // ✅ userId is already the MongoDB _id string
      socket.emit("identity", userId);
    };

    socket.on("connect", onConnect);

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        socket.emit("update-location", {
          userId, // ✅ correct
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geo error:", err);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      socket.off("connect", onConnect);
      navigator.geolocation.clearWatch(watcher);
    };
  }, [userId]);

  return null;
}

export default GeoUpdater;
