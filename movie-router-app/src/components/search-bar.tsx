//client 컴포넌트
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import style from './search-bar.module.css'
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    
    const [search, setSearch] = useState<string>(q || '');
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    
    const router = useRouter();
    const onSubmit = () => {
        if (!search || search === q) return;
        router.push(`/search?q=${search}`);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    return (
        <div className={style.searchbar_container}>
            <input type="text" onChange={onChangeSearch} onKeyDown={onKeyDown} value={search}></input>
            <button onClick={onSubmit}>검색</button>
        </div>
    );
}