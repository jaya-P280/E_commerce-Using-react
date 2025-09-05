
import './searchbox.css';

const Searchbox = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search_div'>
        <input className='Searchbox'
        type="text"
        placeholder='Search Products...'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}>
        </input>
    </div>
  )
}

export default Searchbox;