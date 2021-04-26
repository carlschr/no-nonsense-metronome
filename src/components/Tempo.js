const Tempo = ({handleChange, bpm}) => {
    return (
        <input type='number' value={bpm} onChange={handleChange} className='tempo'/>
    )
}

export default Tempo;