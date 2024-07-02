import React, { useState, useEffect } from 'react';

import { CountriesList } from '../public/CountriesList'
  
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

    for (const country of CountriesList) {
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
      <div className="max-w-md mx-auto p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Are You on Top Github Contributors?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="block text-sm font-medium ">
              Type Your Github name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="account name"
              className="bg-white/20 p-2 block w-full border-gray-100 rounded-md border-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none border-gray-900 border focus:border-none"
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
              <span className="capitalize text-gray-100">{country}</span>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                      </svg>
                      <a href={`https://github.com/${results.login}`}>{results.login}</a>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                        <path d="M9 22v-4h6v4"/>
                        <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                        <path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/>
                        <path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
                      </svg>
                      <span>{results.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" x2="5" y1="12" y2="12"/>
                        <line x1="19" x2="22" y1="12" y2="12"/>
                        <line x1="12" x2="12" y1="2" y2="5"/>
                        <line x1="12" x2="12" y1="19" y2="22"/>
                        <circle cx="12" cy="12" r="7"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      <span>{results.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <a href={`https://x.com/${results.twitterUsername}`} className="underline">
                        @{results.twitterUsername}
                      </a>
                    </div>
                  </div>
                  <div className='bg-gradient-to-r from-transparent via-black to-transparent w-full h-[2px] opacity-40'></div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="grid gap-1">
                      <div className="text-2xl font-semibold">
                        {results.followers}
                      </div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-2xl font-semibold">
                        {results.publicContributions}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        public contributions
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-2xl font-semibold">
                        {results.privateContributions}
                      </div>
                      <div className="text-sm text-muted-foreground"> 
                        private contributions
                      </div>
                    </div>
                  </div>
                </div>
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