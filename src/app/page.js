"use client";
import AllCard from "@/componentes/AllCard";
import AllReview from "@/componentes/AllReview";
import Gallery from "@/componentes/Gallery";
import Research from "@/componentes/Research";
import { useEffect, useState } from "react";

export default function Home() {
  const [college, setCollege] = useState([])
       useEffect(() => {
          fetch(`http://localhost:5000/college`)
              .then(res => res.json())
              .then(data => setCollege(data))
      }, [])
  return (
    <div className="min-h-screen">
      <AllCard></AllCard>
      <Gallery college={college}></Gallery>
      <Research college={college}></Research>
      <AllReview></AllReview>
    </div>
  );
}
