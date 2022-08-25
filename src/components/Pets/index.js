
import {Filter} from '../Filter';
import {Cards} from '../Cards';

import './styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCats, toggleFavored } from '../../store';

const favoriteFilterProps = {
  label: 'Favorite',
  options: [
    {
      label: 'Any',
      value: 'any',
    },
    {
      label:  'Favorite',
      value: true
    },
    {
      label: 'Not favorite',
      value: false
    }
  ]
}

const genderFilterProps = {
  label: 'Gender',
  options: [
    {
      label: 'Any',
      value: 'any',
    },
    {
      label:  'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ]
}

export const Pets = () => {
  const cats = useSelector(state => state);
  const dispatch = useDispatch();

  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({
    gender: 'any',
    favored: 'any',
  });

  const fetchCats = async () => {
    const response = await axios.get('http://localhost:4000/cats');
    
    dispatch(setCats(response.data));
  }

  useEffect(() => {
    fetchCats();
  }, []);

  toggleFavored(1);

  useEffect(() => {
    let filtered = [...cats];

    for(let filter of Object.keys(filters)) {
      if(filters[filter] !== 'any') {
        filtered = filtered.filter(cat => String(cat[filter]) === filters[filter]);
      }
    }

    setFilteredCats(filtered);
  }, [filters, cats]);


  const handleChange = 
    (filter, value) => setFilters({...filters, [filter]: value})

  return (
    <div className="container">
      <div className="app-container">
        <Filter onChange={(e) => handleChange('favored', e)} {...favoriteFilterProps} />
        <Filter onChange={(e) => handleChange('gender', e)} {...genderFilterProps} />
        <Cards cats={filteredCats} />
      </div>
    </div>
  )
}