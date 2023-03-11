import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import ReactDOM from "react-dom/client";

import "./searchPage.css";
import { search } from "../../scripts/apiCalls";
import noImageFound from "../../../public/images/noImageFound.jpeg";


interface Animal {
  id: number;
  name: string;
  description: string;
  contact: {
    email: string;
    address: {
      city: string;
      state: string;
    };
  };
  photos: {
    medium: string;
  }[];
}

export default function SearchPage(props: any) {
  console.log(props);
  useEffect(() => {
    console.log("SearchPage mounted");
  }, []);

  console.log("SearchPage constructor called");
//   const [type, setType] = useState("");
//   const [size, setSize] = useState("");
  const [searchResults, setSearchResults] = useState<Animal[]>([]);
  const [savedPets, setSavedPets] = useState([]);
  const [typeValue, setTypeValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");

  const updateType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeValue(event.target.value);
    console.log("Type value: " + typeValue)
  }, []);

  const updateSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSizeValue(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    let BearerToken = localStorage.getItem("BearerToken") || "";;
    console.log("Search button clicked");
    setTypeValue(typeValue);
    setSizeValue(sizeValue);
    console.log("ABC" + typeValue  + sizeValue  + BearerToken.toString());
    search(typeValue, sizeValue).then((response) => {
      if (response.animals == null) {
        alert("Oops!, Invalid Input");
      } else {
        console.log(response);
        setSearchResults(response.animals);
      }
    });
  }, [typeValue, sizeValue]);

  console.log("Search results: ");
  console.log({ searchResults });

  return (
    <div className="searchPage">
      <div className="searchTitle"> Search Page </div>
      <div className="searchArea">
        <input
          className="searchInput"
          type="text"
          placeholder="Type of pet (eg. dog, rabbit, etc.)"
          value={typeValue}
          onChange={updateType}
        />
        <input
          className="searchInput"
          type="text"
          placeholder="Size of pet (eg. small, medium, large, xlarge)"
          value={sizeValue}
          onChange={updateSize}
        />
        <button className="searchButton" onClick={handleSearch}>
          {" "}
          Search{" "}
        </button>
      </div>
      <div className="searchResults">
        <div className="petDisplayArea">
          {searchResults.map((pet) => (
            <div className="petDisplayCard">
              <div className="petName"> {pet.name} </div>
              <div className="petDescription"> {pet.description} </div>
              <div className="petContact"> Contact: {pet.contact.email} </div>
              <div className="petPhoto">
                {" "}
                <img
                  src={!pet.photos[0] ? noImageFound : pet.photos[0].medium}
                  alt="no image found"
                />{" "}
              </div>
              <div className="petLocation">
                {" "}
                {pet.contact.address.city}, {pet.contact.address.state}{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
