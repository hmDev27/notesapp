import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react" ;

const Navbar = ({userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  };
  
  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };


    return (
<div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
  <h2 className="text-xl font-medium text-black py-2 flex-shrink-0">
    Notes သင်၏မှတ်တမ်း
  </h2>

  <div className="flex-grow mx-4">
    <SearchBar
      value={searchQuery}
      onChange={({ target }) => setSearchQuery(target.value)}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
    />
  </div>

  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
</div>

    )
}

export default Navbar;

