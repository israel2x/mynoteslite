import { useNetwork } from "ahooks";
import React, { useEffect, useState } from "react";

function Footer() {
  const date = new Date();
  const [today, setToday] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const networkState = useNetwork();

  function formatDate(dateObject) {
    const parts = {
      date: dateObject.getDate(),
      month: dateObject.getMonth() + 1,
      year: dateObject.getFullYear(),
    };
    return `${parts.date}/${parts.month}/${parts.year}`;
  }

  useEffect(() => {
    setToday(formatDate(date));
    setIsOnline(networkState.online);
  }, [date, networkState]);

  return (
    <div className="footer">
      <span>Hoy: {today}</span>
      {isOnline ? (
        <span className="online">Online</span>
      ) : (
        <span className="offline">OffLine</span>
      )}
    </div>
  );
}

export default Footer;
