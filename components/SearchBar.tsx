"use client"
import React, { FormEvent, useState } from 'react'

const SearchBar = () => {
    const isValidAmazonLink = (url : string)=>{
try {
    const parserURL = new URL(url);
    const hostname = parserURL.hostname;
    if(hostname.includes('amazon.com')|| hostname.includes('amazon.') || hostname.includes('amazon') ){
        return true
    }

} catch (error) {
    return false
}
return false
    }
    const [searchPrompt, setsearchPrompt] = useState('');
    const [isLoading, setisLoading] = useState(false)
    const handleSubmit =(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const isValidLink = isValidAmazonLink(searchPrompt);
        if(!isValidLink) return alert("Please enter a valid Amazon Link");
        try {
            setisLoading(true);
        } catch (error) {
            console.log(error)
        }finally{
            setisLoading(false)
        }

    }
  return (
    <form className='flex flex-wrap gap-4 mt-12'
    onSubmit={handleSubmit}
    >
        <input type="text" placeholder='Enter product link'  className='searchbar-input' value={searchPrompt} onChange={(e)=>setsearchPrompt(e.target.value)}/>
        <button className='searchbar-btn' disabled={searchPrompt === ''}>{isLoading ? 'Searcing...' : 'Search'}</button>
    </form>
  )
}

export default SearchBar