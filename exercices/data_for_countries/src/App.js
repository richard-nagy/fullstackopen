import { useState, useEffect } from "react";
import axios from "axios";
import { useCountry } from "./hooks";

const DetailedResult = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital[0]}</div>
            <div>area: {country.area}</div>
            <h3>Languages</h3>
            <ul>
                {Object.keys(country.languages).map((key, index) => {
                    return <li key={country.languages[key]}>{country.languages[key]}</li>;
                })}
            </ul>
            <img src={country.flags.png} alt="flag" />
        </div>
    );
};

const Country = ({ country }) => {
    const [showData, setShowData] = useState(false);

    return (
        <div>
            {country.name.common}{" "}
            <button onClick={() => setShowData(!showData)}>Show detailed results</button>
            {showData ? <DetailedResult country={country} /> : null}
        </div>
    );
};

const Results = ({ results }) => {
    if (results.length !== 1) {
        return <div>I need a full countries name</div>;
    } else {
    }

    return <DetailedResult country={results[0]} />;
};

export default function App() {
    const [filter, setFilter] = useState("");
    const countries = useCountry(filter);

    const results =
        countries &&
        countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLocaleLowerCase())
        );

    return (
        <div className="App">
            <div>
                find country: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            <Results results={results} />
        </div>
    );
}
