import React, { useState, useEffect } from 'react';

const countriesList = [/* Add your list of countries here */];

const SearchOneCountry = async (country, RequiredName) => {
  const CountryResponse = await fetch(`https://raw.githubusercontent.com/gayanvoice/top-github-users/main/cache/${country}.json`);
  const CountryData = await CountryResponse.json();
  return CountryData.find(user => user.name === RequiredName) || null;
};

const TopGithubContributors = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const findUser = async (RequiredName) => {
    setIsSearching(true);
    setResults(null);
    setSearching([]);

    let found = false;

    for (const country of countriesList) {
      try {
        setSearching(prev => [...prev, country]);

        const searchOneCountryResults = await SearchOneCountry(country, RequiredName);
        
        setSearching(prev => prev.filter(c => c !== country));

        if (searchOneCountryResults) {
          setResults(searchOneCountryResults);
          found = true;
          break;
        }
      } catch (error) {
        console.error(`Error searching ${country}:`, error);
      }
    }

    if (!found) {
      setResults({ notFound: true, name: RequiredName });
    }

    setIsSearching(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim()) {
      findUser(name.trim());
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Are You on Top Github Contributors?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Type Your Github name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="account name"
              className="p-2 block w-full border-gray-300 rounded-md border-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none border-gray-900 border focus:border-none"
              autoFocus
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:bg-gray-900 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        <div className="flex justify-end w-full p-2">
          {searching.map((country) => (
            <div key={country} className="flex flex-row items-center gap-2 text-lg font-bold">
              <span className="capitalize">{country}</span>
              <span className="loader"></span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {results && !results.notFound && (
            <div className="flex items-center bg-gray-50 p-4 rounded-md shadow-md space-x-4">
              <div className="w-full space-y-2">
                <div className="flex items-center gap-4">
                  <img src={results.avatarUrl} alt="Avatar" className="rounded-full w-24 h-24" />
                  <div className="grid gap-1">
                    <h1 className="text-2xl font-semibold">{results.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {/* SVG and other user details */}
                      <a href={`https://github.com/${results.login}`}>{results.login}</a>
                    </div>
                  </div>
                </div>
                {/* Rest of the user details */}
              </div>
            </div>
          )}
          {results && results.notFound && (
            <div className="flex items-center bg-gray-50 p-4 space-x-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{results.name}</h3>
                <p className="text-sm text-red-600">User not found.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopGithubContributors;