import { useEffect, useState } from "react";
import adEntity from "../../../api/adEntity";  // Importăm adEntity
import Card from "../../Components/Card/card";
import AutocompletareCategorii from "../../Components/Autocompletare/autocompletare-categorii";
import Autocompletare from "../../Components/Autocompletare/autocompletare-orase";

const AllAdsPage = () => {
  const [allAds, setAllAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategorie, setFilterCategorie] = useState("");
  const [filterOras, setFilterOras] = useState("");
  const [filterJudet, setFilterJudet] = useState("Toate");
  const [sortOrder, setSortOrder] = useState("desc");

  const adsPerPage = 8;

  useEffect(() => {
    const fetchAds = async () => {
      const { data, success } = await adEntity.readAll();
      if (success) {
        setAllAds(data);
      }
    };
    fetchAds();
  }, []); // Se execută o singură dată la încărcarea componentei

  const filteredAds = allAds.filter((ad) => {
    const matchCategorie = filterCategorie ? ad.categorie === filterCategorie : true;
    const matchOras = filterOras ? ad.oras === filterOras : true;
    const matchJudet = filterJudet === "Toate" ? true : ad.judet === filterJudet;
    return matchCategorie && matchOras && matchJudet;
  });

  // Sortăm anunțurile în funcție de data de creare
  const sortedAds = [...filteredAds].sort((a, b) => {
    const dateA = new Date(a.createdAt?.seconds * 1000 || 0);
    const dateB = new Date(b.createdAt?.seconds * 1000 || 0);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Calculăm indexurile pentru paginare
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = sortedAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(sortedAds.length / adsPerPage);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-4">Toate Anunțurile</h1>

      {/* 🔽 Filtrare și sortare */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <AutocompletareCategorii onSelect={setFilterCategorie} />
        <Autocompletare onSelect={setFilterOras} />

        <select
          value={filterJudet}
          onChange={(e) => {
            setFilterJudet(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded"
        >
          <option value="Toate">Toate județele</option>
          <option value="Vâlcea">Vâlcea</option>
          <option value="București">București</option>
          <option value="Cluj">Cluj</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="desc">Cele mai noi</option>
          <option value="asc">Cele mai vechi</option>
        </select>
      </div>

      {/* 🧾 Anunțuri */}
      <Card ads={currentAds} />

      {/* 🔘 Paginare */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllAdsPage;



